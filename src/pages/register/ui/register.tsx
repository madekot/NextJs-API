import { LayoutVariant } from '@/const';
import { withLayout } from '@/hocs';
import { RegisterController } from './register/RegisterController';

function Register() {
    return (
        <div>
            <h1>Register</h1>
            <RegisterController />
        </div>
    );
}

export default withLayout(Register, LayoutVariant.WithHeader)