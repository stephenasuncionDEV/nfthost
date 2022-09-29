import { CgWebsite, CgRemove } from 'react-icons/cg'
import { BiSupport } from 'react-icons/bi'
import { VscOrganization } from 'react-icons/vsc'
import { MdOutlineDashboard, MdOutlineMiscellaneousServices, MdPayment } from 'react-icons/md'
import { AiOutlineTeam, AiOutlinePlus } from 'react-icons/ai'
import { SiIpfs } from 'react-icons/si'
import { FaTools } from 'react-icons/fa'

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
                ],
                isExternal: false
            },
            { 
                name: 'Utilities', 
                link: '/utilities', 
                icon: <FaTools />, 
                children: [],
                isExternal: false
            },
            { 
                name: 'Website', 
                link: '/website', 
                icon: <CgWebsite />, 
                children: [
                    { name: 'Templates', link: '/website/templates' },
                    // { name: 'Addons', link: '/website/addons' },
                    // { name: 'Analytics', link: '/website/analytics' }
                ],
                isExternal: false
            },
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
                link: 'https://discord.gg/2BDzCvSTVc', 
                icon: <BiSupport />, 
                children: [],
                isExternal: true
            }
        ]
    },
]

export const getStartedServicesArr = [
    { 
        name: 'NFT Collection Generator', 
        icon: <MdOutlineMiscellaneousServices fontSize='32pt' />, 
        buttonText: 'Generate',
        link: '/dashboard/generator'
    },
    { 
        name: 'NFT Mint Website Hosting', 
        icon: <CgWebsite fontSize='32pt' />, 
        buttonText: 'Create',
        link: '/dashboard/website'
    },
    { 
        name: 'Metadata Utilities', 
        icon: <FaTools fontSize='32pt' />, 
        buttonText: 'Modify',
        link: '/dashboard/utilities'
    }
]

export const metadataStandardsArr = [
    { 
        name: 'Ethereum', 
        image: '/assets/ethereum.png',
        components: [
            'size',
            'name',
            'symbol',
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

export const templatesArr = [
    { name: 'Template1', key: 'Template1', sub: 'free', creator: 'NFTHost' },
    { name: 'Template2', key: 'Template2', sub: 'free', creator: 'NFTHost' },
    { name: 'Template3', key: 'Template3', sub: 'free', creator: 'NFTHost' },
    { name: 'Astro Orange', key: 'Template4', sub: 'premium', creator: 'NFTHost' },
    { name: 'Astro Blue', key: 'Template5', sub: 'premium', creator: 'NFTHost' },
    { name: 'Tropical', key: 'Template6', sub: 'premium', creator: 'NFTHost' },
    { name: 'City Night', key: 'Template7', sub: 'premium', creator: 'NFTHost' },
    { name: 'Graffiti Green', key: 'Template8', sub: 'premium', creator: 'NFTHost' },
    { name: 'Graffiti Blue', key: 'Template9', sub: 'premium', creator: 'NFTHost' }
]

export const addonsArr = [
    { key: 'Navbar', sub: 'premium', creator: 'NFTHost' },
    { key: 'Footer', sub: 'premium', creator: 'NFTHost' },
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

export const websiteSettingsArr = [
    { name: 'General' },
    { name: 'Design' },
    { name: 'Domain' },
    { name: 'Advanced' }
]

export const utilsMenuArr = [
    { title: 'Update Image Storage', icon: <SiIpfs />, key: 'image' },
    { title: 'Add/Edit Metadata Key', icon: <AiOutlinePlus />, key: 'add' },
    { title: 'Remove Metadata Key', icon: <CgRemove />, key: 'remove' }
]

export const partnersArr = [
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

export const teamArr = [
    { 
        name: 'Stephen Asuncion', 
        position: 'CEO and Founder, Software Engineer',
        socials: {
            twitter: 'https://twitter.com/Steb_01',
            linkedin: 'https://www.linkedin.com/in/stephenasuncion',
            youtube: 'https://www.youtube.com/c/stephenasuncion'
        }
    }
]