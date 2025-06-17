const formattedDate = (date: string) => {
    const [ano, mes, dia] = date.split('-');
    return `${dia}/${mes}/${ano}`
}

export default formattedDate