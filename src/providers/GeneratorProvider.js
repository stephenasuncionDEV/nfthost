import { useState, useContext, createContext } from 'react'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'
import config from '@/config/index'
import Web3 from 'web3'
import axios from 'axios'
import { parseJwt } from '@/utils/tools'

export const GeneratorContext = createContext({})
export const useGenerator = () => useContext(GeneratorContext)

export const GeneratorProvider = ({ children }) => {
    const toast = useToast();
    const router = useRouter();

    const controllers = {
        
    }

    return (
		<GeneratorContext.Provider
			value={controllers}
		>
			{ children }
		</GeneratorContext.Provider>
	)
}