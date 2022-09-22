import { loginWithEmailPassword, logoutFirebase, singWithGoogle } from "../../../src/firebase";
import { checkingAuthentication, checkingCredentials, login, logout, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth"
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixtures";


jest.mock('../../../src/firebase/providers');
    
describe('Pruebas en Auth/thunks', () => {
    const dispatch = jest.fn();
    beforeEach(() => jest.clearAllMocks());

    test('debe de invocar el checkingAuthentication', async () => {
        await checkingAuthentication()(dispatch);
        expect(dispatch).toBeCalledWith(checkingCredentials())
    });

    test('debe de invocar el startGoogleSignIn login y exito', async () => {
        const loginData = { ok: true, ...demoUser }

        await singWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));

    });


    test('debe de invocar el startGoogleSignIn logout - Error', async () => {
        const loginData = { ok: false, errorMessage: 'un error en gogle' }

        await singWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData));

    });

    test(' startLoginWithEmailPassword login - Exito', async () => {
        const loginData = { ok: true, ...demoUser }
        const formData = { email: demoUser.email, password: '123456' }
        
        await loginWithEmailPassword.mockResolvedValue(loginData);

        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));

    });

    test(' start debe de llamar LogoutFirebase', async () => {
        
        await startLogout()(dispatch);

        expect(dispatch).toHaveBeenCalled(logoutFirebase());
        expect(dispatch).toHaveBeenCalledWith(logout());
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());

    });


})