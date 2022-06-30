import { CgWebsite } from 'react-icons/cg'
import { BiSupport } from 'react-icons/bi'
import { VscOrganization } from 'react-icons/vsc'
import { MdOutlineDashboard, MdOutlineMiscellaneousServices, MdPayment } from 'react-icons/md'
import { AiOutlineTeam } from 'react-icons/ai'
import { SiIpfs } from 'react-icons/si'

export const TemplatesArr = [
    { key: 'Template1', sub: 'free', creator: 'NFTHost' },
    { key: 'Template2', sub: 'premium', creator: 'NFTHost' },
    { key: 'Template3', sub: 'premium', creator: 'NFTHost' },
]

export const AddonsArr = [
    { key: 'Cookie Consent', sub: 'free', creator: 'NFTHost' },
    { key: 'Navbar', sub: 'premium', creator: 'NFTHost' },
    { key: 'Footer', sub: 'premium', creator: 'NFTHost' },
]

export const PartnersArr = [
    {
        company: 'Flair',
        image: '/assets/partners/flair.png',
        link: 'https://flair.finance/',
        description: 'Open-source Smart Contracts, React Components & REST APIs'
    },
    {
        company: 'ThirdWeb',
        image: '/assets/partners/thirdweb.svg',
        link: 'https://thirdweb.com/',
        description: 'Smart contracts you control. Powerful SDKs and intuitive tools for developers. Ship on-chain faster.'
    },
    {
        company: 'Ambition',
        image: '/assets/partners/ambition.png',
        link: 'https://ambition.so/',
        description: 'End-to-end tools to help creators build their NFT collection'
    },
    {
        company: 'Web3 Philippines',
        image: '/assets/partners/web3philippines.png',
        link: 'https://web3philippines.org/discord',
        description: 'Filipino-led community, helping Filipinos to build in Web3 space by providing free access to Web3 education.'
    },
    // {
    //     company: 'SwiftNFT',
    //     image: '/assets/partners/swiftnft.png',
    //     link: 'https://swiftnft.io/',
    //     description: 'No-Code NFT generator to launch your NFT collection'
    // },
]

export const sidebarArr = [
    { 
        parent: 'navigation',
        items: [ 
            { 
                name: 'Get Started', 
                link: '/getStarted', 
                icon: <MdOutlineDashboard />, 
                children: [],
                isExternal: false
            },
            { 
                name: 'Payments', 
                link: '/payments', 
                icon: <MdPayment />, 
                children: [],
                isExternal: false
            }
        ]
    },
    { 
        parent: 'apps',
        items: [ 
            { 
                name: 'Generator', 
                link: '/generator', 
                icon: <MdOutlineMiscellaneousServices />, 
                children: [
                    { name: 'Metadata', link: '/generator/metadata' },
                    { name: 'Utils', link: '/generator/utils' }
                ],
                isExternal: false
            },
            { 
                name: 'Website', 
                link: '/website', 
                icon: <CgWebsite />, 
                children: [
                    { name: 'Templates', link: '/website/templates' },
                    { name: 'Addons', link: '/website/addons' },
                    { name: 'Domain', link: '/website/domain' },
                    { name: 'Analytics', link: '/website/analytics' }
                ],
                isExternal: false
            }
        ]
    },
    { 
        parent: 'about',
        items: [ 
            { 
                name: 'Partners', 
                link: '/partners', 
                icon: <VscOrganization />, 
                children: [],
                isExternal: false
            },
            { 
                name: 'Team', 
                link: '/team', 
                icon: <AiOutlineTeam />, 
                children: [],
                isExternal: false
            },
            { 
                name: 'Support', 
                link: 'https://discord.gg/BMZZXZMnmv', 
                icon: <BiSupport />, 
                children: [],
                isExternal: true
            }
        ]
    },
]

export const teamArr = [
    { 
        name: 'Stephen Asuncion', 
        position: 'Founder, Software Engineer',
        socials: {
            twitter: 'https://twitter.com/Steb_01',
            linkedin: 'https://www.linkedin.com/in/stephen-allen-asuncion-3735b2176/',
            youtube: 'https://www.youtube.com/channel/UCmKzlQCcDv-fern-Zv8vQ0w'
        }
    }
]

export const analyticsArr = [
    {
        title: 'Unique Users',
        description: 'Amount of unique users who have visited your websites',
        dataset: 'Unique Visit Count',
        style: {
            border: 'rgb(255, 99, 132)',
            bg: 'rgba(255, 99, 132, 0.5)'
        },
        dataKey: 'uniqueVisits'
    },
    {
        title: 'Embed Clicks',
        description: 'Amount of embed clicks of your websites',
        dataset: 'Embed Click Count',
        style: {
            border: 'rgb(255, 165, 0)',
            bg: 'rgba(255, 165, 0, 0.5)'
        },
        dataKey: 'clickedOnEmbed'
    }
]

export const metadataStandardsArr = [
    { 
        name: 'Ethereum', 
        image: '/assets/ethereum.png',
        components: [
            'size',
            'name',
            'description',
            'image',
            'external_url',
            'attributes',
            'background_color',
            'animation_url',
            'youtube_url',
            'compiler'
        ] 
    },
    { 
        name: 'Solana', 
        image: '/assets/solana.png', 
        components: [
            'size',
            'name',
            'symbol',
            'description',
            'seller_fee_basis_points',
            'creators',
            'image',
            'animation_url',
            'external_url',
            'attributes',
            'compiler'
        ] 
    }
]

export const utilsMenuArr = [
    { title: 'Update Image Storage', icon: <SiIpfs />, key: 'image' },
]