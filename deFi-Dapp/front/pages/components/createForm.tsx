import Image from 'next/image';
import { Container } from './container';
import factory_abi from '../api/factory_abi.json';
import factory_address from '../api/factory_address';
import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { Button } from './button';


export function CreateOrg() {

    const [tokenName, settokenName] = useState('');
    const [tokenSymbol, settokenSymbol] = useState('');
    const [tokenAddress, setTokenAddress] = useState('');
    const [admin, setAdmin] = useState('');
    const [singleAccount, setSingleAccount] = useState<any>("");
    const [addr, setAddr] = useState("");
    const [done, setdone] = useState<Boolean>(false);
    const [connectedAddr, setConnectedAddr] = useState<any>("");



    const { address } = useAccount();


    const CreateCert = () => {
        console.log("creating company");
        createOrgWrite?.();
    };

    const { config: CreateOrgConfig } = usePrepareContractWrite({
        address: factory_address,
        abi: factory_abi,
        functionName: "createOrg",
        args: [tokenName, tokenSymbol, tokenAddress, admin],
    });

    const { data: createOrgData, isLoading: createOrgIsLoading, isError: createOrgIsError, write: createOrgWrite } = useContractWrite(CreateOrgConfig);


    const { data: orgAddr, isLoading: yourOrgIsLoading, isError: yourOrgIsError } = useContractRead({
        address: factory_address,
        abi: factory_abi,
        functionName: "getOrganization",
        args: [connectedAddr ?? "0x00"],
    });

    useEffect(() => {

        setConnectedAddr(address);
        console.log(`final child addr:`, orgAddr);
        setSingleAccount(orgAddr);

    }, [address, orgAddr, connectedAddr]);


    return (
        
        <Container className={clsx("pt-20 pb-16 lg:pt-32")}>
            <form className={clsx("flex flex-col gap-8 mt-4 px-8 py-8 m-auto bg-zinc-50 shadow-2xl shadow-zinc-200 rounded-lg ring-1 ring-zinc-200 lg:max-w-2xl")}>
                <h2 className="mx-auto max-w-4xl font-display text-4xl font-medium tracking-tight text-slate-900 ">
                    Create Company
                </h2>

                <div className='space-y-4'>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="cert_name">Company Name</label>
                        <input
                            type="text"
                            name="cert_name"
                            id=""
                            onChange={(e) => { settokenName(e.target.value); }}
                            className='w-full shadow-inner p-2 px-4 ring-1 ring-zinc-200 rounded-md outline-none bg-zinc-50'
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="cert_symbol">Company Symbol</label>
                        <input
                            type="text"
                            name="cert_symbol"
                            id=""
                            onChange={(e) => { settokenSymbol(e.target.value); }}
                            className='w-full shadow-inner p-2 px-4 ring-1 ring-zinc-200 rounded-md outline-none bg-zinc-50 '
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="token_address">Token Address</label>
                        <input
                            type="text"
                            name="token_address"
                            id=""
                            onChange={(e) => { setTokenAddress(e.target.value); }}
                            className='w-full shadow-inner p-2 px-4 ring-1 ring-zinc-200 rounded-md outline-none bg-zinc-50 '
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="admin">Admin</label>
                        <input
                            type="text"
                            name="Admin"
                            id=""
                            onChange={(e) => { setAdmin(e.target.value); }}
                            className='w-full shadow-inner p-2 px-4 ring-1 ring-zinc-200 rounded-md outline-none bg-zinc-50 '
                        />
                    </div>
                </div>
                <Button type='button' className='max-w-max ml-auto' onClick={CreateCert}>
                    Create Company</Button>
            </form>
        </Container>
    );
}
