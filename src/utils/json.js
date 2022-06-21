import { CgWebsite } from 'react-icons/cg'
import { BiSupport } from 'react-icons/bi'
import { VscOrganization } from 'react-icons/vsc'
import { MdOutlineDashboard, MdOutlineMiscellaneousServices, MdPayment } from 'react-icons/md'
import { AiOutlineTeam } from 'react-icons/ai'

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
        company: 'Ambition',
        image: '/assets/partners/ambition.png',
        link: 'https://ambition.so/',
        description: 'End-to-end tools to help creators build their NFT collection'
    },
    {
        company: 'SwiftNFT',
        image: '/assets/partners/swiftnft.png',
        link: 'https://swiftnft.io/',
        description: 'No-Code NFT generator to launch your NFT collection'
    },
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
                children: [],
                isExternal: false
            },
            { 
                name: 'Website', 
                link: '/website', 
                icon: <CgWebsite />, 
                children: [
                    { name: 'Templates', link: '/website/templates' },
                    { name: 'Addons', link: '/website/addons' },
                    { name: 'Domain', link: '/website/domain' }
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