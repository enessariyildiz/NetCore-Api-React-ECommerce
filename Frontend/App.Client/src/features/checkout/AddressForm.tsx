import { Grid2, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function AddressForm() {

    const { register, formState: { errors } } = useFormContext();

    return (
        <Grid2 container spacing={3}>

            <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField
                    {...register("Firstname", { required: "Firstname is required!" })}
                    label="Enter Firstname"
                    fullWidth autoFocus sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.firstname}></TextField>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField
                    {...register("Lastname", { required: "Lastname is required!" })}
                    label="Enter Lastname"
                    fullWidth
                    size="small"
                    error={!!errors.lastname}></TextField>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField
                    {...register("Phone", { required: "Phone is required!" })}
                    label="Enter Phone"
                    fullWidth
                    size="small"
                    error={!!errors.phone}></TextField>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField
                    {...register("City", { required: "City is required!" })}
                    label="Enter City"
                    fullWidth
                    size="small"
                    error={!!errors.city}></TextField>
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
                <TextField
                    {...register("Address", { required: "Address is required!" })}
                    label="Enter Address"
                    fullWidth
                    multiline
                    rows={4}
                    size="small"
                    error={!!errors.address}></TextField>
            </Grid2>

        </Grid2>
    );
}