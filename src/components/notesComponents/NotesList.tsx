import PropTypes from "prop-types";
// material
import { Grid } from "@mui/material";
import NoteCard from "./NoteCard";

// ----------------------------------------------------------------------

// ProductList.propTypes = {
//   products: PropTypes.array.isRequired
// };

interface IProduct {
  id: number;
  name: string;
  cover: string;
  status: string;
}

interface INotesList {
  products: IProduct[];
  [x: string]: any;
}

export default function NotesList({ products, ...other }: INotesList) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <NoteCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
