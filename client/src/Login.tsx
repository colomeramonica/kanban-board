import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorToast from './components/ErrorToast';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (!data.success) {
            return setError(true);
        }
        localStorage.setItem('token', data.token);
        navigate('/home');
    };

    return (
        <section className="bg-gray-1 dark:bg-dark lg:py-[120px] py-20">
            <div className="container mx-auto">
                {error && <ErrorToast />}
                <div className="-mx-4 flex flex-wrap">
                    <div className="px-4 w-full">
                        <div className="bg-white max-w-[525px] md:px-[60px] mx-auto overflow-hidden px-10 py-16 relative rounded-lg sm:px-12 text-center">
                            <div className="mb-10 md:mb-16 text-center">
                                <a
                                    href="/"
                                    className="inline-block max-w-[160px] mx-auto"
                                >
                                    <img
                                        src="../src/assets/logo.png"
                                        alt="logo"
                                    />
                                </a>
                                <h2 className="font-semibold text-2xl text-blue-700 text-heading-color">
                                    Kanban Board
                                </h2>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <InputBox type="email" name="email" placeholder="Email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                                <InputBox
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                />
                                <div className="mb-10">
                                    <input
                                        type="submit"
                                        value="Login"
                                        className="bg-blue-600 border border-blue-600 cursor-pointer font-medium hover:bg-opacity-90 px-5 py-3 rounded-md text-base text-white transition w-full"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Signin;

interface InputBoxProps {
    type: string;
    placeholder: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = ({ type, placeholder, name, value, onChange }: InputBoxProps) => {
    return (
        <div className="mb-6">
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                className="bg-transparent border border-stroke focus-visible:shadow-none focus:border-primary outline-none px-5 py-3 rounded-md text-base text-body-color w-full"
            />
        </div>
    );
};
