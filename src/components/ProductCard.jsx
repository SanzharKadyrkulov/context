import React from "react";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";

function ProductCard({ item }) {
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardMedia sx={{ height: 140 }} image={item.image} title="green iguana" />
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{item.title}
				</Typography>
				<Typography sx={{ color: "red" }} variant="h6">
					${item.price}
				</Typography>
			</CardContent>
			<CardActions>
				<Button color="error" variant="contained" size="small">
					Delete
				</Button>
				<Button color="success" variant="contained" size="small">
					Edit
				</Button>
			</CardActions>
		</Card>
	);
}

export default ProductCard;
