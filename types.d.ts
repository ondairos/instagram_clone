type SuggestionsType = {
    company: { name: string };
    id: number;
    name: string;
    username: string;
    avatar: string;
    email: string;
    dob: Date;
    phone: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    website: string;
};


type Posts = {
    id: string;
    username: string;
    userImg: string;
    img: string;
    caption: string;
};