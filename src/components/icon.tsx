import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Icon() {
  return (
    <Link href="/">
      <Image src="/logo.svg" alt="PetSoft Logo" width={33} height={33} />
    </Link>
  );
}
