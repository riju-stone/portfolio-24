import { usePathname } from "next/navigation";

export function useActivePath(): (path: string) => boolean {
	const pathname = usePathname();
	// console.log("Current pathname: ", pathname);
	const checkActivePath = (path: string) => {
		if (path !== "/") {
			return pathname.indexOf(path) !== -1;
		} else {
			return pathname === path;
		}
	};
	return checkActivePath;
}
