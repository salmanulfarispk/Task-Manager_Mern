import React from 'react'
import { Dialog } from '@headlessui/react'
import Textbox from "./Textbox"
import { useForm } from 'react-hook-form'
import Button from './Button'
import Loading from "./Loading"
import ModalWrapper from "./ModalWrapper "
import { useChangePasswordMutation } from '../redux/slices/api/userApiSlice'
import { toast } from 'sonner'

const ChangePassword = ({ open, setOpen }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [ChangeUserPass, { isLoading }] = useChangePasswordMutation();

    const handleOnSubmit = async (data) => {
        if(data.password !== data.cpass){
            toast.warning("Password doesnt match! shreddikk ambaane..");
            return;
        }

        try {
            
            await ChangeUserPass(data).unwrap();
            toast.success("Password Changed succesfully!")

            setTimeout(() => {
                setOpen(false)
            }, 1500)

        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || err.error)
        }


    }

    return (
        <>
            <ModalWrapper open={open} setOpen={setOpen}>
                <form onSubmit={handleSubmit(handleOnSubmit)}>
                    <Dialog.Title as='h2' className='text-base font-bold leading-6 text-gray-900 mb-4'>
                        Change password
                    </Dialog.Title>

                    <div className='mt-2 flex flex-col gap-6'>
                        <Textbox
                            type="password"
                            name="password"
                            label="New Password"
                            placeholder="New password"
                            className="w-full rounded-full"
                            register={register("password", {
                                required: "New Password is required!"
                            })}

                            error={errors.password ? errors.password.message : ""}
                        />

                        <Textbox
                            type="password"
                            name="cpass"
                            label=" Confirm Password"
                            placeholder="Confirm New password"
                            className="w-full rounded-full"
                            register={register("cpass", {
                                required: "Confirm Password is required!"
                            })}

                            error={errors.cpass ? errors.cpass.message : ""}
                        />
                    </div>

                    {isLoading ? (
                        <div className='py-5'>
                            <Loading />
                        </div>
                    ) : (
                        <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
                            <Button
                                type='submit'
                                label='Save'
                                className="bg-blue-600 px-8 text-sm  font-semibold text-white hover:bg-blue-700 rounded-md"
                            />

                            <button
                                type='button'
                                className=" bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto hover:scale-105"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </button>

                        </div>
                    )
                    }

                </form>
            </ModalWrapper>
        </>
    )
}

export default ChangePassword