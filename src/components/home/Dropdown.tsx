import { Location } from "@/types/Location";
import { useState } from "react"

interface DropdownProps {
    locations: Location[] | undefined,
    idLocation: string,
    setIdLocation: (id: string) => void,
    error: string | undefined,
    isError: boolean
}

export default function Dropdown({ locations, idLocation, setIdLocation, error, isError }: DropdownProps) {
    const [showDropDown, setShowDropDown] = useState(false);

    const selectedLocation = locations?.find((loc) => loc.id === idLocation);
    return (

        isError == true ? <h1 className="text-red-600 font-medium text-lg">{error}</h1> :
            <div className="relative inline-block text-left underline">
                <div className="border-b-2 border-gray-900">
                    <div onClick={() => setShowDropDown(!showDropDown)} className="-mb-1 inline-flex w-full justify-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-xs font-semibold text-gray-900 cursor-pointer" id="menu-button" aria-expanded="true" aria-haspopup="true">
                        {selectedLocation?.lokasi ?? "Pilih lokasi"}
                        <svg className="-mr-1 size-3 md:size-6 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>

                <div className={`${showDropDown == true ? 'block' : 'hidden'} max-h-30 overflow-y-auto absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}`}>
                    <div className="py-1" role="none">
                        {
                            locations?.map((location) => {
                                return <a onClick={() => {
                                    setIdLocation(location.id);
                                    setShowDropDown(false);
                                }} key={location.id} className="cursor-pointer block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="menu-item-0">{location.lokasi}</a>
                            })
                        }
                    </div>
                </div>
            </div>
    );
}