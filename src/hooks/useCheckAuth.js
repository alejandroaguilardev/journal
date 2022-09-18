import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase";
import { login, logout } from "../store/auth";
import { startLoadingNote } from "../store/journal";

export const useCheckAuth = () => {
	const { status } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		onAuthStateChanged(FirebaseAuth, async (user) => {
			if (!user) return dispatch(logout());

			const { uid, displayName, photoURL, email } = user;
			dispatch(login({ uid, email, displayName, photoURL }));
			dispatch(startLoadingNote());
		});
	}, []);

	return status;
};
