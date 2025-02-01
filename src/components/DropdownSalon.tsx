import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import { ChevronsUpDown } from "lucide-react";

export default async function DropdownSalon() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full h-full hover:bg-muted transition-all flex justify-center items-center">
          <div className="w-full flex items-center lg:gap-4 gap-2 lg:ml-4 ml-2">
            <Avatar className="h-10 w-10 rounded-full">
              {/* <img
                :src="activeSalon.logoPath"
                alt="Salon logo"
                class="border rounded-full"
              /> */}
            </Avatar>
            <span className="truncate">Pies Na Glanc</span>
          </div>
          <div className="flex w-full lg:justify-end">
            <ChevronsUpDown className="mr-1" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="min-w-56 rounded-lg"
          align="start"
          side="bottom"
        >
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Twoje salony
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem
            v-for="(salon, index) in salonStore.salons"
            :key="salon.name"
            class="mt-2"
            :className="{
              'bg-violet-500 text-white': salon.name === activeSalon.name,
              'hover:bg-gray-100': salon.name !== activeSalon.name,
            }"
            @click="setActiveSalon(salon)"
          > */}
          {/* <div className="flex size-6 items-center justify-center">
              <Avatar class="h-4 w-4 rounded-full">
                <img :src="salon.logoPath" alt="Mini salon logo" />
              </Avatar>
            </div>
            {{ salon.name }} */}
          {/* </DropdownMenuItem> */}
          <DropdownMenuSeparator />
          {/* <AddNewSalon /> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
