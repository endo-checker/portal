type Request = {
    url: string;
    body?: {
        [key: string]: string | number | object;
    };
};

// only using post requests for buf.connect
export const fetchJSON = async (req: Request) => {
    const { url, body } = req;
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify(body) ?? null,
        });
        const j = await res.json();
        if (!res.ok) {
            if (j.message) {
                return { error: j.message };
            }
            return { error: `${res.status} ${res.statusText}` };
        }
        return j;
    } catch (e) {
        return { error: e }
    }
};