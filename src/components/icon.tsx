import { Link } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Icon() {
  return (
    <Link href="/">
      <Image src="/logo.svg" alt="icon" width={33} height={33} />;
    </Link>
  );
}
