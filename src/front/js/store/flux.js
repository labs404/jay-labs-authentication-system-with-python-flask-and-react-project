const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			// added login action below
			login: async (email, password) => {
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(
						{
							"email": email,
							"password": password
						}
					)
				}
				// turned into an async try await
				/////////////////////////////////////////////////////
				// fetch("https://cuddly-space-broccoli-7g6q4r97xw62p66x-3001.app.github.dev/api/token", options)
				// .then(response => {
				// 	if(response.status === 200) return response.json();
				// })
				// .then(data => {
				// 	console.log("Access token:", data);
				// 	sessionStorage.setItem("token", data.access_token);
				// })
				// .catch(error => console.log("There was an error.", error))
				/////////////////////////////////////////////////////
				try{
					const response = await fetch("https://cuddly-space-broccoli-7g6q4r97xw62p66x-3001.app.github.dev/api/token", options)
					if(response.status !== 200) {
						alert("Error! Response code: " + response.status)
						return false;
					}
					const data = await response.json()
					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token })
					return true;
				}
				catch(error) {
					console.log("Login error! Please try again!")
				}
			},
			// added login function above
			logout: () => {
					//line below also works.
					// sessionStorage.setItem("token", null);
					sessionStorage.removeItem("token");
					setStore({ token: null })
			},
			syncSessionToken: () => {
				const token = sessionStorage.getItem("token");
				if (token && token !== "" && token !== undefined) {
					setStore({ token: token })
				}
			},
			getMessage: async () => {
				const store = getStore();
				const options = {
					headers: {
						"Authorization": "Bearer " + store.token
					},
				}
				try{
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello", options)
					const data = await resp.json()
					console.log("data message",data.message)
					setStore({ message: data.message })
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				const store = getStore();
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
