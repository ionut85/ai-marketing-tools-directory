import { useState } from "react";
import { SearchBar } from "../SearchBar";

export default function SearchBarExample() {
  const [value, setValue] = useState("");
  
  return (
    <div className="w-full max-w-2xl">
      <SearchBar value={value} onChange={setValue} />
    </div>
  );
}
