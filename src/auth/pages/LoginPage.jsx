import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as LinkRouter } from "react-router-dom";
import {
	Alert,
	Button,
	Grid,
	Link,
	TextField,
	Typography,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import {
	startGoogleSignIn,
	startLoginWithEmailPassword,
} from "../../store/auth";

const formData = {
	email: "",
	password: "",
};

export const LoginPage = () => {
	const { status, errorMessage } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const { email, password, onInputChange } = useForm(formData);

	const isAuthenticating = useMemo(() => status === "checking", [status]);

	const onSubmit = (event) => {
		event.preventDefault();
		dispatch(startLoginWithEmailPassword({ email, password }));
	};

	const onGoogleSignIn = (event) => {
		event.preventDefault();
		dispatch(startGoogleSignIn());
	};

	return (
		<AuthLayout title="Login">
			<form
			aria-label='submit-form'
				onSubmit={onSubmit}
				className="animate__animated animate__fadeIn animate_faster"
			>
				<Grid container>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Correo"
							name="email"
							value={email}
							onChange={onInputChange}
							type="email"
							placeholder="correo@google.com"
							fullWidth
						/>
					</Grid>

					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Contraseña"
							name="password"
							value={password}
							onChange={onInputChange}
							type="password"
							placeholder="Contraseña"
							fullWidth
							inputProps={{
								'data-testid': 'password'
							}}
						/>
					</Grid>

					<Grid container spacing={2} item xs={12} sx={{ mb: 0, mt: 1 }}>
						<Grid
							item
							xs={12}
							display={!!errorMessage ? "" : "none"}
							sx={{ mb: 0, mt: 0 }}
						>
							<Alert severity="error">{errorMessage}</Alert>
						</Grid>

						<Grid item xs={12} sm={6}>
							<Button
								variant="contained"
								fullWidth
								type="submit"
								disabled={isAuthenticating}
							>
								Login
							</Button>
						</Grid>

						<Grid item xs={12} sm={6}>
							<Button
								variant="contained"
								fullWidth
								onClick={onGoogleSignIn}
								disabled={isAuthenticating}
								aria-label='google-btn'
							>
								<Google />
								<Typography sx={{ ml: 1 }}>Google</Typography>
							</Button>
						</Grid>
					</Grid>
					<Grid container direction="row" justifyContent="end">
						<Link component={LinkRouter} color="inherit" to="/auth/register">
							Crear una cuenta
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
