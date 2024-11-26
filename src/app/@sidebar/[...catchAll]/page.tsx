import React from "react";
import Page from "../page";
import { SearchParams } from "~/types";

const Default = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  return <Page searchParams={searchParams} />;
};

export default Default;
