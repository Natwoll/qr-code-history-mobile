export default function getFormatedDate() {
    const currentDate = new Date();
    return currentDate.getDate() + '-' + parseInt(currentDate.getMonth() + 1) + '-' + currentDate.getFullYear();
}