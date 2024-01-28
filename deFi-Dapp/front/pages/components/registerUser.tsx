import { Container } from "./container";
import child_abi from "../api/child_abi.json";
import factory_abi from "../api/factory_abi.json";
import factory_address from "../api/factory_address";

import React, { useEffect, useState } from "react";

import { clsx } from "clsx";
import {
  Address,
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { Button } from "../components/button";

export function RegisterUser() {
  const [holderType, setholderType] = useState("");
  const [vestAmount, setvestAmount] = useState(0);
  const [locktime, setlocktime] = useState(0);

  const [singleAccount, setSingleAccount] = useState<Address>();
  const [connectedAddr, setConnectedAddr] = useState("");

  const { address } = useAccount();

  const AddUser = async () => {
    console.log("registering address");
    AddUserWrite?.();
  };

  const { config: IssueCertConfig } = usePrepareContractWrite({
    address: singleAccount,
    abi: child_abi,
    functionName: "addMember",
    args: [holderType, vestAmount, locktime],
  });

  const {
    data: issueCertData,
    isLoading: issueCertIsLoading,
    isError: issueCertIsError,
    write: issueCertWrite,
    isSuccess: Successfully,
  } = useContractWrite(IssueCertConfig);

  const {
    data: certAddr,
    isLoading: yourCertIsLoading,
    isError: yourCertIsError,
  } = useContractRead({
    address: factory_address,
    abi: factory_abi,
    functionName: "getOrganization",
    args: [connectedAddr ?? "0x00"],
  });

  useEffect(() => {
    setConnectedAddr(address as Address);
    console.log(`final child addr:`, certAddr);
    setSingleAccount(certAddr as Address);
  }, [address, certAddr, connectedAddr]);

  return (
    <Container className="pt-20 pb-16 lg:pt-32">
      <form
        className={clsx(
          "flex flex-col gap-8 mt-4 px-8 py-8 m-auto bg-zinc-50 shadow-2xl shadow-zinc-200 rounded-lg ring-1 ring-zinc-200 lg:max-w-2xl"
        )}
      >
        <h2 className="mx-auto max-w-4xl font-display text-4xl font-medium tracking-tight text-slate-900 ">
          Register User
        </h2>

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="role_name">User Role</label>
            <input
              type="text"
              name="role_name"
              id=""
              onChange={(e) => {
                setholderType(e.target.value);
              }}
              className="w-full shadow-inner p-2 px-4 ring-1 ring-zinc-200 rounded-md outline-none bg-zinc-50"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="vestAmount">Vest Amount</label>
            <input
              type="number"
              name="vestAmount"
              id=""
              onChange={(e) => {
                setvestAmount(Number(e.target.value));
              }}
              className="w-full shadow-inner p-2 px-4 ring-1 ring-zinc-200 rounded-md outline-none bg-zinc-50"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="lock_time">Withdraw Time</label>
            <input
              type="number"
              name="lock_time"
              id=""
              onChange={(e) => {
                setlocktime(Number(e.target.value));
              }}
              className="w-full shadow-inner p-2 px-4 ring-1 ring-zinc-200 rounded-md outline-none bg-zinc-50 "
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Button type="button" onClick={AddUser} disabled={false}>
            Add User
          </Button>
        </div>
        <p className="green">{Successfully ? `VESTING SUCCESFUL` : ""}</p>
      </form>
    </Container>
  );
}
function AddUserWrite() {
    throw new Error("Function not implemented.");
}

