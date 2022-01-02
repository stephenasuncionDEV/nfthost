import style from "../styles/Host.module.scss"
    import { Typography } from "@mui/material";
    import MintContainer from "../components/MintContainer";
    import Header from "../components/Header"  
    const pllt5i74kxwo3kir = () => {
        return (
            <div className={style.hostFrame}>
                <Header 
                    title="Kalabaw NFT"
                    description="Kalabaw NFT is a collection of NFTs."
                    keywords="NFT Host, Host NFTs, Mint Website, NFT Website Hosting, Mint NFT Website Hosting, Mint NFT, NFT, Mint, Crypto Currency, Crypto, Ethereum"
                    robots={true}
                    language="English"
                    image="https://i.postimg.cc/DyCr7rbx/icon.png"
                />
                <div className={style.hostContainer}>
                    <img src="https://i.postimg.cc/DyCr7rbx/icon.png" alt="NFT Host Logo" />
                    <Typography variant="h2" component="div">
                        Kalabaw NFT
                    </Typography>
                    <Typography variant="body1">
                        Kalabaw NFT is a collection of NFTs.
                    </Typography>
                    <MintContainer 
                        iframe="<iframe
  src='https://cloudflare-ipfs.com/ipfs/bafybeigpfbnasq3sbciukilnculoy3cd24ov5mshzmuw7gregexdy223be?contract=0xce240737302120e7C61334fFec8DF254B7003703&chainId=4'
  width='600px'
  height='600px'
  style='max-width:100%;'
  frameborder='0'
/>"
                    />
                </div>
            </div>
        )
    }  
    export default pllt5i74kxwo3kir