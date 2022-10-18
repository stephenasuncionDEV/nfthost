import { useUser } from "@/providers/UserProvider";
import { useGenerator } from "@/providers/GeneratorProvider";
import { useToast } from "@chakra-ui/react";
import { useMemberControls } from "@/hooks/useMemberControls";
import { usePaymentControls } from "@/hooks/usePaymentControls";
import posthog from "posthog-js";
import MD5 from "crypto-js/md5";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { shuffleArray } from "@/utils/tools";
import errorHandler from "@/utils/errorHandler";

const zip = new JSZip();

export const useGenerate = () => {
  const toast = useToast({
    title: "Error",
    status: "error",
    duration: 3000,
    isClosable: true,
    position: "bottom",
  });
  const { pay } = usePaymentControls();
  const {
    name,
    description,
    externalURL,
    standardType,
    symbol,
    creators,
    layers,
    collectionSize,
    imageDimension,
    sellerFee,
    metadata,
    setIsAutoSave,
    setIsGenerating,
    setIsDownloading,
    setIsGenerateModal,
    setIsDownloadModal,
    setIsGenerated,
    setAutoSavePercentage,
    setDownloadPercentage,
    setMetadata,
    setCurMetadata,
    setRenderIndex,
    setGenerateSpeed,
    setIsConfetti,
    canvasRef,
    setPreviewLayers,
    isRandomizedMetadata,
    backgroundColor,
    animationURL,
    youtubeURL,
    storageURL,
  } = useGenerator();
  const { address } = useUser();
  const { getUserByAddress, deductUnit } = useMemberControls();

  const RandomPreview = (silent = false) => {
    try {
      if (!silent) {
        layers.forEach((layer) => {
          if (!layer.images.length)
            throw new Error(
              `Layer ${layer.name} cannot have 0 traits. Please add trait(s) or remove the layer`,
            );
        });
      }

      let retPreviewLayers = [];

      layers.forEach((layer) => {
        retPreviewLayers.push(
          layer.images[Math.floor(Math.random() * layer.images.length)]
            ?.preview,
        );
      });

      setPreviewLayers(retPreviewLayers);
    } catch (err) {
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  const getCanvas = () => {
    return new Promise((resolve, reject) => {
      const waitForCurrentShit = () => {
        if (canvasRef.current) return resolve(canvasRef.current);
        setTimeout(waitForCurrentShit, 30);
      };
      waitForCurrentShit();
    });
  };

  // Get weighted random image index
  const getLayerImageIndex = (layer) => {
    let weights = [];
    layer.images.forEach((image, idx) => {
      weights.push(parseInt(image.rarity.value) + (weights[idx - 1] || 0));
    });
    const random = Math.random() * layer.images[0].rarity.max;
    let randomIndex = 0;
    for (let i = 0; i < weights.length; i++) {
      if (weights[i] > random) {
        randomIndex = i;
        break;
      }
    }
    return randomIndex;
  };

  // Draws image on canvas
  const drawOnCanvas = (ctx, layer) => {
    return new Promise((resolve) => {
      try {
        const randomIndex = getLayerImageIndex(layer);
        const newAttribute = {
          trait_type: layer.name,
          value: layer.images[randomIndex].name,
        };
        if (imageDimension) {
          ctx.drawImage(
            layer.images[randomIndex].image,
            0,
            0,
            imageDimension.width,
            imageDimension.height,
          );
        }
        resolve(newAttribute);
      } catch (err) {
        console.log("drawOnCanvas", err);
      }
    });
  };

  // Stack all layers together
  const stackLayers = (ctx) => {
    return Promise.all(
      layers.map(async (layer) => {
        return await drawOnCanvas(ctx, layer);
      }),
    );
  };

  // Save the canvas to zip
  const saveCanvas = (curRenderIndex) => {
    return new Promise((resolve, reject) => {
      try {
        canvasRef?.current?.toBlob((blob) => {
          zip.folder("Images")?.file(`${curRenderIndex}.png`, blob);
          resolve();
        });
      } catch (err) {
        console.log(err);
        reject();
      }
    });
  };

  // Auto save chunks
  const autoSave = (chunkCount) => {
    return new Promise(async (resolve, reject) => {
      try {
        const content = await zip.generateAsync(
          {
            type: "blob",
            streamFiles: true,
          },
          (data) => {
            setAutoSavePercentage(data.percent);
          },
        );
        saveAs(content, `NFTHost Image Chunk ${chunkCount}.zip`);
        zip.remove("Images");
        resolve();
      } catch (err) {
        console.log(err);
        reject();
      }
    });
  };

  const buildMetadataObj = (curRenderIndex, startCount, attributes) => {
    const standard = standardType.name.toLowerCase();
    const externalStorage =
      storageURL.trim().charAt(storageURL.length - 1) === "/"
        ? storageURL.substring(0, storageURL.length - 1)
        : storageURL;

    const DEFAULT_METADATA = {
      name: `${name.trim()} #${curRenderIndex}`,
      description: description.trim(),
      image: `${externalStorage}/${startCount}.png`,
      attributes,
      compiler: "https://nfthost.app/",
    };

    let metadataObj = {
      ethereum: {
        ...DEFAULT_METADATA,
      },
      solana: {
        ...DEFAULT_METADATA,
        symbol,
        seller_fee_basis_points: sellerFee,
        properties: {
          category: "image",
          files: [
            {
              uri: `${startCount}.png`,
              type: "image/png",
            },
          ],
          creators,
        },
      },
    };

    // Optional data

    if (symbol.length > 0) {
      metadataObj.ethereum = { ...metadataObj.ethereum, symbol: symbol };
    }

    if (externalURL.length > 0) {
      metadataObj.ethereum = {
        ...metadataObj.ethereum,
        external_url: externalURL,
      };
      metadataObj.solana = { ...metadataObj.solana, external_url: externalURL };
    }

    if (backgroundColor.length > 0) {
      metadataObj.ethereum = {
        ...metadataObj.ethereum,
        background_color: backgroundColor,
      };
    }

    if (animationURL.length > 0) {
      metadataObj.ethereum = {
        ...metadataObj.ethereum,
        animation_url: animationURL,
      };
      metadataObj.solana = {
        ...metadataObj.solana,
        animation_url: animationURL,
      };
    }

    if (youtubeURL.length > 0) {
      metadataObj.ethereum = {
        ...metadataObj.ethereum,
        youtube_url: youtubeURL,
      };
    }

    return metadataObj[standard];
  };

  // Generate NFTs
  const Generate = async () => {
    try {
      layers.forEach((layer) => {
        if (!layer.images.length)
          throw new Error(
            `Layer ${layer.name} cannot have 0 traits. Please add a trait or remove the layer`,
          );
      });

      if (imageDimension.width <= 0 || imageDimension.height <= 0)
        throw new Error("Image width or length must be greater than 0");

      let possibleCombination = 1;
      layers.forEach((layer) => (possibleCombination *= layer.images.length));

      if (possibleCombination < collectionSize)
        throw new Error(
          `Possible combination is under the desired collection count (${possibleCombination}/${collectionSize}). You must add more images to your layer(s).`,
        );

      if (!name.length)
        throw new Error(
          "You must input a name for your NFT Collection. Can be found under Metadata settings in the toolbar.",
        );
      if (!description.length)
        throw new Error(
          "You must input a description for your NFT Collection. Can be found under Metadata settings in the toolbar.",
        );

      const user = await getUserByAddress(address);

      const generationUnits = user.services.generator.units;

      if (collectionSize > 100 && generationUnits <= 0) {
        pay({
          service: "Generator",
          product: `1 NFT collection generation (${collectionSize}x unique images)`,
          redirect: {
            origin: "/dashboard/generator",
            title: "Generator",
          },
          data: {
            size: parseInt(collectionSize),
          },
        });
        return;
      } else if (collectionSize > 100 && generationUnits > 0) {
        await deductUnit("generator");
      }

      setIsGenerateModal(true);

      const canvas = await getCanvas();
      const ctx = canvas.getContext("2d");

      zip.remove("Images");

      let chunkCount = 1;
      let curRenderIndex = 1;
      let startCount = 0;
      let hashList = [];
      let curMetadata = [];

      const t0 = performance.now();
      let t1;

      setIsGenerated(false);
      setIsAutoSave(false);
      setIsGenerating(true);
      setMetadata([]);
      setCurMetadata("");

      while (startCount != collectionSize) {
        setRenderIndex(curRenderIndex);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const attributes = await stackLayers(ctx);
        const currentHash = MD5(JSON.stringify(attributes)).toString();
        if (!hashList.includes(currentHash)) {
          hashList.push(currentHash);
          await saveCanvas(startCount);
          const nftJson = buildMetadataObj(
            curRenderIndex,
            startCount,
            attributes,
          );
          curMetadata.push(nftJson);
          setCurMetadata(JSON.stringify(nftJson, null, 2));

          // Todo: check performance even under 1000
          //if (!window.performance.memory) {
          if (
            collectionSize >= 1000 &&
            (curRenderIndex == collectionSize || curRenderIndex % 1000 == 0)
          ) {
            setIsAutoSave(true);
            setIsDownloading(true);
            await autoSave(chunkCount++);
            setIsDownloading(false);
          }
          //} else {
          //    if (window.performance.memory.usedJSHeapSize > window.performance.memory.jsHeapSizeLimit - 5e+8) {
          //        setIsAutoSave(true);
          //        setIsDownloading(true);
          //        await autoSave(chunkCount++);
          //        setIsDownloading(false);
          //    }
          //}

          curRenderIndex++;
          startCount++;
          if (startCount == collectionSize) {
            t1 = performance.now();
            setGenerateSpeed(t1 - t0);
            setMetadata(curMetadata);
            setIsGenerating(false);
            setIsGenerateModal(false);
            setIsGenerated(true);
            setIsConfetti(true);
            setIsDownloadModal(true);
            console.log(
              `[NFTHost] It took ${
                t1 - t0
              } milliseconds to generate this collection.`,
            );
            posthog.capture("User generated a collection", {
              standardType,
            });
          }
        }
      }
    } catch (err) {
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  // Download collection including images and metadata
  const DownloadCollection = async () => {
    try {
      if (!metadata.length)
        throw new Error("Please generate your collection first");

      setIsDownloading(true);

      zip.remove("Metadata");
      zip.remove("CSV metadata.csv");

      // Save Json Metadata

      let fileIndex = 0;

      let tempMetadata = [...metadata];

      if (isRandomizedMetadata) {
        tempMetadata = shuffleArray(tempMetadata);
      }

      zip
        .folder("Metadata")
        .file("metadata.json", JSON.stringify(tempMetadata, null, 2));

      metadata.forEach((data) => {
        zip
          .folder("Metadata")
          .file(`${fileIndex}.json`, JSON.stringify(data, null, 2));
        fileIndex++;
      });

      // Save Csv Metadata

      if (standardType.name === "Ethereum") {
        let csvData = [];

        // Create Columns
        let keys = Object.keys(metadata[0]).filter(
          (key) => key !== "attributes",
        );
        const attributes = metadata[0].attributes.map(
          (attribute) => attribute.trait_type,
        );
        const columns = [...keys, ...attributes];
        csvData.push(columns);

        // Create Rows
        tempMetadata.forEach((data) => {
          let row = Object.values(data).filter(
            (value) => typeof value !== "object",
          );
          data.attributes.forEach((attribute) => {
            row.push(attribute.value);
          });
          csvData.push(row);
        });

        let csv = "";
        csvData.forEach((row) => {
          csv += row.join(",");
          csv += "\n";
        });

        const csvBlob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        zip.file("CSV metadata.csv", csvBlob);
      }

      const content = await zip.generateAsync(
        {
          type: "blob",
          streamFiles: true,
        },
        (data) => {
          setDownloadPercentage(data.percent);
        },
      );

      saveAs(content, "NFTHost Collection.zip");
      setIsDownloading(false);

      posthog.capture("User downloaded collection");
    } catch (err) {
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  // Download metadata including json and csv metadata
  const DownloadMetadata = async () => {
    try {
      if (!metadata.length)
        throw new Error("Please generate your collection first");

      setIsDownloading(true);

      zip.remove("Metadata");
      zip.remove("CSV metadata.csv");

      // Save Json Metadata

      let fileIndex = 0;

      let tempMetadata = [...metadata];

      if (isRandomizedMetadata) {
        tempMetadata = shuffleArray(tempMetadata);
      }

      zip
        .folder("Metadata")
        .file("metadata.json", JSON.stringify(tempMetadata, null, 2));

      metadata.forEach((data) => {
        zip
          .folder("Metadata")
          .file(`${fileIndex}.json`, JSON.stringify(data, null, 2));
        fileIndex++;
      });

      // Save Csv Metadata

      if (standardType.name === "Ethereum") {
        let csvData = [];

        // Create Columns
        let keys = Object.keys(metadata[0]).filter(
          (key) => key === "attributes",
        );
        const attributes = metadata[0].attributes.map(
          (attribute) => attribute.trait_type,
        );
        const columns = [...keys, ...attributes];
        csvData.push(columns);

        // Create Rows
        tempMetadata.forEach((data) => {
          let row = Object.values(data).filter(
            (value) => typeof value !== "object",
          );
          data.attributes.forEach((attribute) => {
            row.push(attribute.value);
          });
          csvData.push(row);
        });

        let csv = "";
        csvData.forEach((row) => {
          csv += row.join(",");
          csv += "\n";
        });

        const csvBlob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        zip.file("CSV metadata.csv", csvBlob);
      }

      const content = await zip.generateAsync(
        {
          type: "blob",
          streamFiles: true,
        },
        (data) => {
          setDownloadPercentage(data.percent);
        },
      );

      saveAs(content, "NFTHost Metadata.zip");
      setIsDownloading(false);

      posthog.capture("User downloaded metadata");
    } catch (err) {
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  return {
    getCanvas,
    RandomPreview,
    Generate,
    DownloadCollection,
    DownloadMetadata,
  };
};
