export default function getTimesNow(): string{
    const date = new Date().toISOString().split('T')[0];
    return date;
}