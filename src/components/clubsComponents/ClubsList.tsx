import PropTypes from "prop-types";
// material
import { Grid } from "@mui/material";
import ClubCard from "./ClubCard";

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

interface IClubsList {
  products: IProduct[];
  [x: string]: any;
}

export default function ClubsList({ products, ...other }: IClubsList) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <ClubCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
