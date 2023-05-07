import { useNavigate } from "react-router-dom";
import { IconClockHour4 } from "@tabler/icons-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginRequestDTO, LoginResponseDTO } from "../types";
import { login } from "../service/auth.service";
import { notifications } from "@mantine/notifications";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
export default function LoginView() {
  const navigate = useNavigate();

  const { login: handleSetAuth, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  type Inputs = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (loginRequestDto: LoginRequestDTO) => {
    login(loginRequestDto).then((res) => handleLoginResponse(res));
  };

  const handleLoginResponse = ({ user: _user }: LoginResponseDTO) => {
    if (_user) {
      handleSetAuth(_user);
    } else {
      notifications.show({
        message: "Email or password incorrect, please try again.",
      });
    }
  };

  return (
    <>
      <div className='flex flex-col mt-32'>
        <IconClockHour4 className='text-brand-500 opacity-40 justify-self-center self-center' size='6rem' />
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className=''>
            <div className='flex flex-col space-y-5'>
              <div className=''>
                <label htmlFor='username' className='ml-2'>
                  Email
                </label>
                <input
                  type='email'
                  className='input mt-1'
                  {...register("email", {
                    required: "Required",
                  })}
                />
                {errors.email && <p className='text-red-600 ml-2 mt-1'>{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor='password' className='ml-2'>
                  Password
                </label>
                <input type='password' className='input mt-1' {...register("password", { required: "Required" })} />
                {errors.password && <p className='text-red-600 ml-2 mt-1'>{errors.password.message}</p>}
              </div>
            </div>

            <button type='submit' className='w-full btn btn-primary mt-10'>
              Log in
            </button>
          </form>
        </div>
      </div>
      {/* <IconClockHour4 className=' bg-green-100 text-brand-700 opacity-40' size='5rem' />

        <form onSubmit={handleSubmit(onSubmit)} className='justify-self-end h-full'>
          <div className='flex flex-col space-y-5'>
            <div className=''>
              <label htmlFor='username' className='ml-2'>
                Email
              </label>
              <input
                type='email'
                className='input mt-1'
                {...register("email", {
                  required: "Required",
                })}
              />
              {errors.email && <p className='text-red-600 ml-2 mt-1'>{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor='password' className='ml-2'>
                Password
              </label>
              <input type='password' className='input mt-1' {...register("password", { required: "Required" })} />
              {errors.password && <p className='text-red-600 ml-2 mt-1'>{errors.password.message}</p>}
            </div>
          </div>

          <button type='submit' className='w-full btn btn-primary mt-10'>
            Log in
          </button>
        </form> */}
      {/* <div className='flex flex-col h-screen bg-red-100 '>
          <IconClockHour4 className='self-center text-brand-700 opacity-40' size='5rem' />
          <div className='bg-green-100 self-center'>
            <TextInput label='Email' variant='filled' radius='xl' size='md' />
            <PasswordInput label='Password' variant='filled' radius='xl' size='md' className='mt-10' />
            <button className='btn-primary w-full mt-10'>LOG IN</button>
          </div>
        </div> */}
    </>
  );
}
