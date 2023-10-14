const host = 'http://localhost:1234/'

async function signUpQueue(kind: "department" | "atm", id: number) {
    let response;
    if (kind == "department") {
        response = await fetch(`${host}/api/queue/departments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({departmentId: id})
        })
    } else {
        response = await fetch(`${host}/api/queue/atms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({atmId: id})
        })
    }
    return response.status;
}

export {signUpQueue}