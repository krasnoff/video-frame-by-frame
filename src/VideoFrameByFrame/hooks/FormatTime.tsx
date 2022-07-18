
export function useFormatTime() {
    const format = (seconds: any) => {
        const hours: number = Math.floor(seconds / 3600);
        const minutes: number = Math.floor((seconds - hours * 3600) / 60);
        const finalseconds: number = Math.round(seconds - hours * 3600 - minutes * 60);

        if (hours > 0) {
            return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + finalseconds.toString().padStart(2, '0');
        }
        return minutes.toString().padStart(2, '0') + ':' + finalseconds.toString().padStart(2, '0');
    }

    return {format};
}