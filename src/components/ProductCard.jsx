import React, { useContext } from "react";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";
import { productContext } from "../contexts/ProductContext";
import { Link } from "react-router-dom";
import { newProductContext } from "../contexts/NewProductContext";

function ProductCard({ item }) {
	const { deleteProduct } = useContext(newProductContext);

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
				<Button
					onClick={() => deleteProduct(item.id)}
					color="error"
					variant="contained"
					size="small"
				>
					Delete
				</Button>
				<Button
					component={Link}
					to={`/edit/${item.id}`}
					color="success"
					variant="contained"
					size="small"
				>
					Edit
				</Button>
			</CardActions>
		</Card>
	);
}

export default ProductCard;
