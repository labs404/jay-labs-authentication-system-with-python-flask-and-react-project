const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			email: null
		},
		actions: {
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
				try{
					const response = await fetch(process.env.BACKEND_URL + "api/token", options)
					if(response.status !== 200) {
						alert("Error! Response code: " + response.status);
						return false;
					}
					const data = await response.json();
					sessionStorage.setItem("token", data.access_token);
					sessionStorage.setItem("email", email);
					setStore({ token: data.access_token });
					setStore({ email: email })
					console.log("from flux login() here is your data", data);
					return true;
				}
				catch(error) {
					console.log("Login error! Please try again!");
					console.error("There was an error!!!!", error);
				}
			},
			logout: () => {
					const store = getStore();
					sessionStorage.removeItem("token");
					sessionStorage.removeItem("email");
					setStore({ token: null });
					setStore({ email: null });
					console.log("from flux logout(), you are logged out", store.token)
			},
			signup: async (email, password) => {
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
				};				
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/signup", options);
					if (response.ok) {
					  	alert("You have successfully registered a new account!");
					  	return true;
					}
					else {
					  	alert("Signup failed. Please try again later.");
						return false;
					}
				} 
				catch (error) {
					console.error("Error during signup:", error);
				}				
				return false;
			},
			syncSessionToken: () => {
				const token = sessionStorage.getItem("token");
				if (token && token !== "" && token !== undefined && token !== null) {
					setStore({ token: token })
				}
			},
			syncSessionEmail : () => {
				const email = sessionStorage.getItem("email");
				if (email && email !== "" && email !== undefined && email !== null) {
					setStore({ email: email })
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
			}
		}
	};
};

export default getState;