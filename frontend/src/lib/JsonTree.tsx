import React, { useState } from "react";
import { FaTrash, FaPlus, FaChevronDown, FaChevronRight } from "react-icons/fa6";

type JsonValue = string | number | boolean | null | JsonValue[] | { [k: string]: JsonValue };

const typeColor = (v: any) => {
    if (v === null) return "text-orange-700 dark:text-orange-400";
    if (typeof v === "string") return "text-yellow-800 dark:text-yellow-300";
    if (typeof v === "number") return "text-purple-700 dark:text-purple-300";
    if (typeof v === "boolean") return "text-cyan-800 dark:text-cyan-300";
    if (typeof v === "undefined") return "text-zinc-600 dark:text-zinc-400";
    if (typeof v === "object" && Array.isArray(v)) return "text-lime-800 dark:text-lime-300";
    if (typeof v === "object") return "text-pink-700 dark:text-pink-300";
    return "text-black dark:text-white";
};
const typeLabel = (v: any) => {
    if (v === null) return "NULL";
    if (typeof v === "string") return "string";
    if (typeof v === "number") return "int";
    if (typeof v === "boolean") return "bool";
    if (typeof v === "undefined") return "undefined";
    if (Array.isArray(v)) return "array";
    if (typeof v === "object") return "object";
    return typeof v;
};
const parseInput = (str: string): JsonValue => {
    if (str === "null") return null;
    if (str === "true") return true;
    if (str === "false") return false;
    if (!isNaN(Number(str)) && str.trim() !== "") return Number(str);
    return str;
};

export const JsonTree: React.FC<{
    value: JsonValue;
    onChange: (v: JsonValue) => void;
}> = ({ value, onChange }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [hoverKey, setHoverKey] = useState<string | number | null>(null);
    const [hoverAdd, setHoverAdd] = useState(false);
    const [editKey, setEditKey] = useState<string | number | null>(null);
    const [editType, setEditType] = useState<"key" | "value" | null>(null);
    const [editVal, setEditVal] = useState<string>("");

    const startEdit = (k: string | number, v: any, type: "key" | "value") => {
        setEditKey(k);
        setEditType(type);
        setEditVal(type === "key" ? String(k) : String(v));
    };
    const saveEdit = (k: string | number, v: any) => {
        if (!editType) return;
        if (Array.isArray(value)) {
            const arr = [...value];
            if (editType === "value") arr[Number(k)] = parseInput(editVal);
            onChange(arr);
        } else if (typeof value === "object" && value) {
            const obj: any = { ...value };
            if (editType === "key") {
                let newKey = editVal.trim() === "" ? "newKey" : editVal;
                let idx = 1;
                while (obj.hasOwnProperty(newKey) && newKey !== k) {
                    newKey = `${editVal || "newKey"}${idx++}`;
                }
                if (newKey !== String(k)) {
                    obj[newKey] = obj[k];
                    delete obj[k];
                }
            } else if (editType === "value") {
                obj[k] = parseInput(editVal);
            }
            onChange(obj);
        }
        setEditKey(null);
        setEditType(null);
        setEditVal("");
    };
    const handleDelete = (k: string | number) => {
        if (Array.isArray(value)) {
            const arr = [...value];
            arr.splice(Number(k), 1);
            onChange(arr);
        } else if (typeof value === "object" && value) {
            const obj: any = { ...value };
            delete obj[k];
            onChange(obj);
        }
    };
    const handleAdd = () => {
        if (Array.isArray(value)) {
            onChange([...value, ""]);
        } else if (typeof value === "object" && value) {
            let base = "newKey";
            let idx = 0;
            let newKey = base;
            while ((value as any).hasOwnProperty(newKey)) {
                idx += 1;
                newKey = `${base}${idx}`;
            }
            onChange({ ...value, [newKey]: "" });
        }
    };

    if (Array.isArray(value)) {
        return (
            <div className="pl-4">
                <div className="flex items-center space-x-1">
                    <button onClick={() => setCollapsed(v => !v)} className="p-1">
                        {collapsed
                            ? FaChevronRight({ size: 12 })
                            : FaChevronDown({ size: 12 })}
                    </button>
                    <span className="font-bold text-[#a6e22e]">[array]</span>
                    <span className="text-xs text-[#75715e]">{` ${value.length} items`}</span>
                    <span
                        className={`ml-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-150 ${hoverAdd ? "opacity-100" : ""}`}
                        onMouseEnter={() => setHoverAdd(true)}
                        onMouseLeave={() => setHoverAdd(false)}
                    >
            <button
                className="ml-1"
                title="추가"
                onClick={handleAdd}
            >
              {FaPlus({ className: "text-green-400 hover:text-green-600", size: 12 })}
            </button>
          </span>
                </div>
                {!collapsed && (
                    <div>
                        {value.map((v, i) => (
                            <div key={i} className="group">
                                <div className="flex flex-row items-start py-0.5">
                  <span className="mr-2 min-w-[32px] text-right text-[#f8f8f2] font-mono select-none">
                    {i} :
                  </span>
                                    {typeof v !== "object" || v === null ? (
                                        <span
                                            onDoubleClick={() => startEdit(i, v, "value")}
                                            className={`${typeColor(v)} cursor-pointer select-text font-mono`}
                                        >
                      {editKey === i && editType === "value" ? (
                          <input
                              value={editVal}
                              onChange={e => setEditVal(e.target.value)}
                              onBlur={() => saveEdit(i, v)}
                              onKeyDown={e => e.key === "Enter" && saveEdit(i, v)}
                              autoFocus
                              className="px-1 border-b border-blue-400 bg-transparent text-inherit"
                              style={{ width: 90 }}
                          />
                      ) : (
                          <>
                              <span className="mr-2">{JSON.stringify(v)}</span>
                              <span className="text-xs text-[#75715e]">{typeLabel(v)}</span>
                          </>
                      )}
                    </span>
                                    ) : null}
                                    {hoverKey === i && (
                                        <button onClick={() => handleDelete(i)} className="ml-1 mt-0.5">
                                            {FaTrash({ className: "text-red-400 hover:text-red-700", size: 13 })}
                                        </button>
                                    )}
                                </div>
                                {(typeof v === "object" && v !== null) && (
                                    <div className="ml-8">
                                        <JsonTree value={v} onChange={nv => {
                                            const arr = [...value];
                                            arr[i] = nv;
                                            onChange(arr);
                                        }} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    } else if (typeof value === "object" && value) {
        const keys = Object.keys(value);
        return (
            <div className="pl-4">
                <div className="flex items-center space-x-1">
                    <button onClick={() => setCollapsed(v => !v)} className="p-1">
                        {collapsed
                            ? FaChevronRight({ size: 12 })
                            : FaChevronDown({ size: 12 })}
                    </button>
                    <span className="font-bold text-[#f92672]">&#123; object &#125;</span>
                    <span className="text-xs text-[#75715e]">{` ${keys.length} items`}</span>
                    <span
                        className={`ml-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-150 ${hoverAdd ? "opacity-100" : ""}`}
                        onMouseEnter={() => setHoverAdd(true)}
                        onMouseLeave={() => setHoverAdd(false)}
                    >
            <button
                className="ml-1"
                title="추가"
                onClick={handleAdd}
            >
              {FaPlus({ className: "text-green-400 hover:text-green-600", size: 12 })}
            </button>
          </span>
                </div>
                {!collapsed && (
                    <div>
                        {keys.map((k, idx) => (
                            <div key={k} className="group">
                                <div className="flex flex-row items-start py-0.5">
                  <span
                      onDoubleClick={() => startEdit(k, value[k], "key")}
                      className="text-zinc-800 dark:text-zinc-100 font-bold cursor-pointer font-mono mr-2 min-w-[80px] text-right"
                  >
                    {editKey === k && editType === "key" ? (
                        <input
                            value={editVal}
                            onChange={e => setEditVal(e.target.value)}
                            onBlur={() => saveEdit(k, value[k])}
                            onKeyDown={e => e.key === "Enter" && saveEdit(k, value[k])}
                            autoFocus
                            className="px-1 border-b border-blue-400 bg-transparent text-inherit"
                            style={{ width: 70 }}
                        />
                    ) : (
                        `"${k}"`
                    )}
                  </span>
                                    <span className="mx-1 text-[#f8f8f2]">:</span>
                                    {typeof value[k] !== "object" || value[k] === null ? (
                                        <span
                                            onDoubleClick={() => startEdit(k, value[k], "value")}
                                            className={`${typeColor(value[k])} cursor-pointer select-text font-mono`}
                                        >
                      {editKey === k && editType === "value" ? (
                          <input
                              value={editVal}
                              onChange={e => setEditVal(e.target.value)}
                              onBlur={() => saveEdit(k, value[k])}
                              onKeyDown={e => e.key === "Enter" && saveEdit(k, value[k])}
                              autoFocus
                              className="px-1 border-b border-blue-400 bg-transparent text-inherit"
                              style={{ width: 90 }}
                          />
                      ) : (
                          <>
                              <span className="mr-2">{JSON.stringify(value[k])}</span>
                              <span className="text-xs text-[#75715e]">{typeLabel(value[k])}</span>
                          </>
                      )}
                    </span>
                                    ) : null}
                                    {hoverKey === k && (
                                        <button onClick={() => handleDelete(k)} className="ml-1 mt-0.5">
                                            {FaTrash({ className: "text-red-400 hover:text-red-700", size: 13 })}
                                        </button>
                                    )}
                                </div>
                                {(typeof value[k] === "object" && value[k] !== null) && (
                                    <div className="ml-8">
                                        <JsonTree value={value[k]} onChange={nv => {
                                            const obj = { ...value, [k]: nv };
                                            onChange(obj);
                                        }} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    } else {
        return (
            <span className={`${typeColor(value)} font-mono`}>
        {JSON.stringify(value)} <span className="text-xs text-[#75715e]">{typeLabel(value)}</span>
      </span>
        );
    }
};