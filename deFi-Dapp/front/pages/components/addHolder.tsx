import Image from 'next/image';
import { Container } from './container';
import child_abi from '../api/child_abi.json';
import factory_abi from '../api/factory_abi.json';
import factory_address from '../api/factory_address';
import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { Button } from './Button';


export function AddHolder() {

    const [holder, setholder] = useState('');
    const [vestingPeriod, setvestingPeriod] = useState(0);
    const [minimalAmount, setminimalAmount] = useState(0);
    const [singleAccount, setSingleAccount] = useState<any>("");
    const [connectedAddr, setConnectedAddr] = useState<any>("");



    const { address } = useAccount();


    const AddHolder = () => {
        console.log("adding role...");
        addHolderWrite?.();
    };

    const { config: AddHolderConfig } = usePrepareContractWrite({
        address: singleAccount,
        abi: child_abi,
        functionName: "addStakeholder",
        args: [holder, vestingPeriod, minimalAmount],
    });

    const { data: addHolderData, isLoading: addHolderIsLoading, isError: addHolderIsError, write: addHolderWrite } = useContractWrite(AddHolderConfig);


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
                        <label htmlFor="holder_name">Holder Name</label>
                        <input
                            type="text"
                            name="holder_name"
                            id=""
                            onChange={(e) => { setholder(e.target.value); }}
                            className='w-full shadow-inner p-2 px-4 ring-1 ring-zinc-200 rounded-md outline-none bg-zinc-50'
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="timelock">Timelock</label>
                        <input
                            type="Number"
                            name="timelock"
                            id=""
                            onChange={(e) => { setvestingPeriod(Number(e.target.value)); }}
                            className='w-full shadow-inner p-2 px-4 ring-1 ring-zinc-200 rounded-md outline-none bg-zinc-50 '
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="minimalAmount">Minimal Amount</label>
                        <input
                            type="Number"
                            name="minimalAmount"
                            id=""
                            onChange={(e) => { setminimalAmount(Number(e.target.value)); }}
                            className='w-full shadow-inner p-2 px-4 ring-1 ring-zinc-200 rounded-md outline-none bg-zinc-50 '
                        />
                    </div>
                </div>
                <Button type='button' className='max-w-max ml-auto' onClick={AddHolder}>
                    Create Holdertype</Button>
            </form>
        </Container>
    );
}
