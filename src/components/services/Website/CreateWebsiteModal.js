import { useState } from "react";
import {
  HStack,
  Text,
  Button,
  Flex,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useWebsiteControls } from "@/hooks/services/website/useWebsiteControls";
import DynamicInput from "@/components/DynamicInput";
import ReCAPTCHA from "react-google-recaptcha";
import config from "@/config/index";

const CreateWebsiteModal = ({ isOpen, onClose }) => {
  const { createWebsite, isCreatingWebsite, creationInputState, recaptchaRef } =
    useWebsiteControls();
  const [route, setRoute] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("https://www.nfthost.app/assets/logo.png");
  const [script, setScript] = useState("");
  const [embed, setEmbed] = useState("");
  const [favicon, setFavicon] = useState("https://www.nfthost.app/favicon.ico");
  const [robot, setRobot] = useState("");
  const [language, setLanguage] = useState("");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
      scrollBehavior="inside"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a Minting Website</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDir="column" maxH="530px">
          <HStack alignItems="center" w="full">
            <Text fontSize="10pt">Website Information</Text>
            <Divider flex="1" />
          </HStack>
          <HStack mt="1em">
            <DynamicInput
              id="title"
              name="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={setTitle}
              helperText="Display title of your minting website"
              isInvalid={creationInputState?.title?.status}
              errorText={creationInputState?.title?.message}
              flex="1"
            />
            <DynamicInput
              id="language"
              name="language"
              type="language"
              placeholder="Language"
              value={language}
              onChange={setLanguage}
              helperText="Website's content language"
            />
          </HStack>
          <DynamicInput
            id="description"
            name="description"
            type="textarea"
            placeholder="Description"
            value={description}
            onChange={setDescription}
            helperText="Short description of your minting website"
            isInvalid={creationInputState?.description?.status}
            errorText={creationInputState?.description?.message}
            rows={5}
            mt="1em"
          />
          <HStack alignItems="center" w="full" mt="2em">
            <Text fontSize="10pt">Media</Text>
            <Divider flex="1" />
          </HStack>
          <HStack mt="1em">
            <DynamicInput
              id="favicon"
              name="favicon"
              type="text"
              placeholder="Favicon URL"
              value={favicon}
              onChange={setFavicon}
              helperText="External link of Icon in your browser's tab"
              isInvalid={creationInputState?.favicon?.status}
              errorText={creationInputState?.favicon?.message}
              flex="1"
            />
            <DynamicInput
              id="logo"
              name="logo"
              type="text"
              placeholder="Logo URL"
              value={logo}
              onChange={setLogo}
              helperText="External link of logo of your minting website"
              isInvalid={creationInputState?.logo?.status}
              errorText={creationInputState?.logo?.message}
              flex="1"
            />
          </HStack>
          <HStack alignItems="center" w="full" mt="2em">
            <Text fontSize="10pt">Code</Text>
            <Divider flex="1" />
          </HStack>
          <HStack mt="1em">
            <DynamicInput
              id="script"
              name="script"
              type="textarea"
              placeholder="Style or Script code"
              value={script}
              onChange={setScript}
              helperText="Script or Style code of a third-party website"
              isInvalid={creationInputState?.script?.status}
              errorText={creationInputState?.script?.message}
              rows={5}
              flex="1"
            />
            <DynamicInput
              id="embed"
              name="embed"
              type="textarea"
              placeholder="Embed code"
              value={embed}
              onChange={setEmbed}
              helperText="Embed code of a third-party website"
              isInvalid={creationInputState?.embed?.status}
              errorText={creationInputState?.embed?.message}
              rows={5}
              flex="1"
            />
          </HStack>
          <HStack alignItems="center" w="full" mt="2em">
            <Text fontSize="10pt">SEO</Text>
            <Divider flex="1" />
          </HStack>
          <DynamicInput
            id="robot"
            name="robot"
            type="select"
            placeholder="SEO Robot Configuration"
            value={robot}
            onChange={setRobot}
            helperText="Tells search engines what to follow and what not to follow"
            selectData={[
              { value: "if", text: "index, follow" },
              { value: "nf", text: "noindex, follow" },
              { value: "in", text: "index, nofollow" },
              { value: "nn", text: "noindex, nofollow" },
            ]}
            mt="1em"
          />
          <HStack alignItems="center" w="full" mt="2em">
            <Text fontSize="10pt">Misc</Text>
            <Divider flex="1" />
          </HStack>
          <DynamicInput
            id="subdomain"
            name="subdomain"
            type="text"
            placeholder="Subdomain"
            value={route}
            onChange={setRoute}
            helperText="Subdomain of your website"
            isInvalid={creationInputState?.route?.status}
            errorText={creationInputState?.route?.message}
            mt="1em"
            maxW="380px"
            addonRight
            addonRightText={`.${config?.frontendUrl}`}
            textTransform="lowercase"
          />
          <Flex mt="2em" alignItems="center" flexDir="column">
            <Text fontSize="10pt" mb=".5em">
              Verify that you are a human
            </Text>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={config?.recaptcha?.siteKey}
              onExpired={() => {
                toast({ description: "ReCaptcha has expired" });
              }}
              onErrored={() => {
                toast({ description: "ReCaptcha network issue" });
              }}
            />
          </Flex>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                createWebsite({
                  route,
                  title,
                  description,
                  logo,
                  script,
                  embed,
                  favicon,
                  robot,
                  language,
                  onClose: onClose,
                });
              }}
              disabled={isCreatingWebsite}
              isLoading={isCreatingWebsite}
              loadingText="Creating"
            >
              Create
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateWebsiteModal;
