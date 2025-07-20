import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../../store/store.ts";
import {sendMessage} from "../../../slices/contactSlice.ts";

export function Contact() {

    const dispatch = useDispatch<AppDispatch>();

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<FormData>();

    type FormData = {
        email: string;
        subject: string;
        message: string;
    }

    const onSubmit = (data: FormData) => {
        dispatch(sendMessage(data));
        reset();
    }

    return (
        <div className="form-container max-w-[500px] my-10 mx-auto p-5 bg-white rounded-2xl shadow-xl/30">
            <h2 className="text-3xl mb-4 tracking-[0.1rem]">Contact Us</h2>
            <form className="contact-form flex flex-col gap-4"
                  onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group flex flex-col">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="h-8 border border-gray-400 rounded-md px-3"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: 'Invalid email format',
                            },
                        })}
                    />
                    {errors.email ?
                        <span className="error text-red-600 text-[0.875rem] mt-1.5">{errors.email.message}</span>
                        : ''
                    }
                </div>

                <div className="form-group flex flex-col">
                    <label>Subject:</label>
                    <input type="text"
                           className="h-8 border border-gray-400 rounded-md px-3"
                           {...register('subject', {
                               required: 'subject is required',
                               pattern: {
                                   value: /^.{10,30}$/,
                                   message: "subject must be beteween 10 and 30 characters...!"
                               },
                           })}/>
                    {errors.subject ?
                        <span className="error text-red-600 text-[0.875rem] mt-1.5">{errors.subject.message}</span>
                        : ''
                    }
                </div>

                <div className="form-group flex flex-col">
                    <label>Message:</label>
                    <textarea cols = "30" rows = "10"
                              className="border border-gray-400 rounded-md px-3"
                              {...register('message', {
                                  required: true
                              })}></textarea>
                    {errors.message ?
                        <span className="error text-red-600 text-[0.875rem] mt-1.5">Message is Required...!</span>
                        : ''
                    }
                </div>

                <button type="submit"
                        className="submit-btn bg-[#4a90e2] border-0 rounded-2xl py-2.5 px-5 text-base cursor-pointer ease delay-75 hover:bg-[#357ab8] text-amber-50 font-bold tracking-widest">Submit
                </button>
            </form>
        </div>
    );
}