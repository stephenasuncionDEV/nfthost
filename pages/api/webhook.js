const handler = (req, res) => {
    const body = JSON.parse(req.body)
    console.log(body);
}

export default handler