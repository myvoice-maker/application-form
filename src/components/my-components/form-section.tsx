// "use client";

// import { useForm } from "react-hook-form";
// import SignatureCanvas from "react-signature-canvas";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRef, useState } from "react";
// import toast from "react-hot-toast";

// const schema = z.object({
//   firstName: z.string().min(2, "Enter valid name"),
//   lastName: z.string().min(2, "Enter valid name"),
//   email: z.string().email(),
//   phone: z
//     .string()
//     .min(10, { message: "enter proper a number" })
//     .regex(/^\d+$/, "Numbers only"),
//   occupation: z.string().min(1, { message: "enter your occupation" }),
//   peopleToOccupyProperty: z
//     .string()
//     .min(1, { message: "field cant't be empty" }),
//   hasVehicle: z.enum(["yes", "no"], {
//     message: "must select either yes or no",
//   }),
//   hasPet: z.enum(["yes", "no"], {
//     message: "must select either yes or no",
//   }),
//   beenEvicted: z.enum(["yes", "no"], {
//     message: "must select either yes or no",
//   }),
//   paymentMethod: z.enum(
//     ["Zelle", "Apple Pay", "Cash App", "Venmo", "Chime", "Paypal"],
//     {
//       message: "select the correct payment method",
//     },
//   ),

//   movingDate: z.string().min(1, { message: "select a date" }),
//   signature: z.string().min(1, { message: "signature is required" }),
// });

// type FormValues = z.infer<typeof schema>;

// const inputStyle = "mt-1 w-full rounded-md border px-3 py-1";
// const inputWrapper = "mt-4";

// export default function FormSection() {
//   const sigRef = useRef<SignatureCanvas | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<FormValues>({
//     resolver: zodResolver(schema),
//   });

//   const onSubmit = async (data: FormValues) => {
//     console.log(data);
//     setIsLoading(true);
//     try {
//       const res = await fetch("/api/user/applications", {
//         method: "POST",
//         body: JSON.stringify(data),
//       });
//       const response = await res.json();
//       if (res.ok) {
//         toast.success("form submitted");
//       } else {
//         toast.error("something went wrong");
//       }
//       console.log(response);
//     } catch (error) {
//       console.log(error);
//       toast.error("an error occured");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const saveSignature = () => {
//     if (sigRef.current) {
//       const canvas = sigRef.current.getCanvas();

//       const data = canvas.toDataURL("image/jpeg", 0.6);

//       setValue("signature", data, { shouldValidate: true });
//     }
//   };
//   //   const saveSignature = () => {
//   //     if (sigRef.current) {
//   //       const data = sigRef.current.toDataURL("image/png");
//   //       setValue("signature", data, { shouldValidate: true });
//   //     }
//   //   };

//   const clearSignature = () => {
//     sigRef.current?.clear();
//     setValue("signature", "");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center  lg:p-6 px-2">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full max-w-lg rounded-3xl lg:p-8 p-4 space-y-8"
//       >
//         <div></div>

//         {/* GRID */}
//         <div className="">
//           {/* NAME */}
//           <div className="lg:grid grid-cols-2 gap-x-4">
//             {/* First Name and Last Name */}
//             <div className="">
//               <label className="text-sm font-medium text-gray-700">
//                 First Name
//               </label>
//               <input
//                 type="text"
//                 {...register("firstName")}
//                 className={inputStyle}
//               />
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.firstName?.message}
//               </p>
//             </div>

//             {/* Last Name */}
//             <div>
//               <label className="text-sm font-medium text-gray-700">
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 {...register("lastName")}
//                 className={inputStyle}
//               />
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.lastName?.message}
//               </p>
//             </div>
//           </div>

//           {/* EMAIL */}

//           <div className={inputWrapper}>
//             <label className="text-sm font-medium text-gray-700">Email</label>
//             <input type="email" {...register("email")} className={inputStyle} />
//             <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
//           </div>

//           {/* PHONE */}
//           <div className={inputWrapper}>
//             <label className="text-sm font-medium text-gray-700">Phone</label>
//             <input type="text" {...register("phone")} className={inputStyle} />
//             <p className="text-red-500 text-sm mt-1">{errors.phone?.message}</p>
//           </div>
//         </div>

//         {/* has vehicle */}
//         <div className={inputWrapper}>
//           <label className="text-sm font-medium text-gray-700">
//             Do you have a vehicle?
//           </label>
//           <div className="flex gap-6 mt-2">
//             <div className="flex flex-col">
//               <label className="flex items-center gap-2">
//                 <input type="radio" value="yes" {...register("hasVehicle")} />
//                 <span>Yes</span>
//               </label>

//               <label className="flex items-center gap-2">
//                 <input type="radio" value="no" {...register("hasVehicle")} />
//                 <span>no</span>
//               </label>
//             </div>
//           </div>
//           <p className="text-red-500 text-sm mt-1">
//             {errors.hasVehicle?.message}
//           </p>
//         </div>

//         {/* Occupation */}
//         <div className={inputWrapper}>
//           <label className="text-sm font-medium text-gray-700">
//             Ocupation / Job title
//           </label>

//           <input
//             type="text"
//             {...register("occupation")}
//             className={inputStyle}
//           />
//           <p className="text-red-500 text-sm mt-1">
//             {errors.occupation?.message}
//           </p>
//         </div>

//         {/* people to occupy propery */}
//         <div className={inputWrapper}>
//           <label className="text-sm font-medium text-gray-700">
//             Number of Person who will occupy property
//           </label>

//           <input
//             type="text"
//             {...register("peopleToOccupyProperty")}
//             className={inputStyle}
//           />
//           <p className="text-red-500 text-sm mt-1">
//             {errors.peopleToOccupyProperty?.message}
//           </p>
//         </div>

//         {/* do you have a pet */}

//         <div className={inputWrapper}>
//           <label className="text-sm font-medium text-gray-700">
//             Do you have a pet?
//           </label>
//           <div className="flex gap-6 mt-2">
//             <div className="flex flex-col">
//               <label className="flex items-center gap-2">
//                 <input type="radio" value="yes" {...register("hasPet")} />
//                 <span>Yes</span>
//               </label>

//               <label className="flex items-center gap-2">
//                 <input type="radio" value="no" {...register("hasPet")} />
//                 <span>no</span>
//               </label>
//             </div>
//           </div>
//           <p className="text-red-500 text-sm mt-1">{errors.hasPet?.message}</p>
//         </div>

//         {/* been evictted */}
//         <div className={inputWrapper}>
//           <label className="text-sm font-medium text-gray-700">
//             Have you Been Evicted Before
//           </label>
//           <div className="flex gap-6 mt-2">
//             <div className="flex flex-col">
//               <label className="flex items-center gap-2">
//                 <input type="radio" value="yes" {...register("beenEvicted")} />
//                 <span>Yes</span>
//               </label>

//               <label className="flex items-center gap-2">
//                 <input type="radio" value="no" {...register("beenEvicted")} />
//                 <span>no</span>
//               </label>
//             </div>
//           </div>
//           <p className="text-red-500 text-sm mt-1">
//             {errors.beenEvicted?.message}
//           </p>
//         </div>

//         {/* DATE */}
//         <div className={inputWrapper}>
//           <label className="text-sm font-medium text-gray-700">
//             Moving Date
//           </label>
//           <input
//             type="date"
//             {...register("movingDate")}
//             className={inputStyle}
//           />
//           <p className="text-red-500 text-sm mt-1">
//             {errors.movingDate?.message}
//           </p>
//         </div>

//         {/* been evictted */}
//         <div className={inputWrapper}>
//           <label className="text-sm font-medium text-gray-700">
//             How Do you intend paying for the application form? it's also
//             refundable if you don't like the house or get approved
//           </label>
//           <div className="flex gap-6 mt-2">
//             <div className="flex flex-col">
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   value="Zelle"
//                   {...register("paymentMethod")}
//                 />
//                 <span className="text-sm">Zelle</span>
//               </label>
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   value="Apple Pay"
//                   {...register("paymentMethod")}
//                 />
//                 <span className="text-sm">Apple Pay</span>
//               </label>
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   value="Cash App"
//                   {...register("paymentMethod")}
//                 />
//                 <span className="text-sm">Cash App</span>
//               </label>
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   value="Venmo"
//                   {...register("paymentMethod")}
//                 />
//                 <span className="text-sm">Venmo</span>
//               </label>
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   value="Chime"
//                   {...register("paymentMethod")}
//                 />
//                 <span className="text-sm">Chime</span>
//               </label>
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   value="Paypal"
//                   {...register("paymentMethod")}
//                 />
//                 <span className="text-sm">Paypal</span>
//               </label>
//             </div>
//           </div>
//           <p className="text-red-500 text-sm mt-1">
//             {errors.paymentMethod?.message}
//           </p>
//         </div>

//         {/* SIGNATURE */}
//         <div>
//           <label className="text-sm font-medium text-gray-700">Signature</label>

//           <div className="mt-2 border-2 border-dashed rounded-xl bg-gray-50">
//             <SignatureCanvas
//               ref={sigRef}
//               penColor="black"
//               canvasProps={{ className: "w-full h-40" }}
//             />
//           </div>

//           <div className="flex gap-3 mt-3">
//             <button
//               type="button"
//               onClick={clearSignature}
//               className="px-4 py-2 border rounded-lg"
//             >
//               Clear
//             </button>
//             <button
//               type="button"
//               onClick={saveSignature}
//               className="px-4 py-2 bg-black text-white rounded-lg"
//             >
//               Save Signature
//             </button>
//           </div>

//           <p className="text-red-500 text-sm mt-1">
//             {errors.signature?.message}
//           </p>
//         </div>

//         {/* SUBMIT */}
//         <button
//           type="submit"
//           className="w-full py-3 bg-black text-white rounded-xl"
//         >
//           {isLoading ? "Loading" : "Submit"}
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useForm } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Users,
  Car,
  PawPrint,
  Gavel,
  Calendar,
  CreditCard,
  PenTool,
  Loader2,
  CheckCircle,
  Home,
} from "lucide-react";

const schema = z.object({
  firstName: z.string().min(2, "Enter valid name"),
  lastName: z.string().min(2, "Enter valid name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(/^\d+$/, "Numbers only"),
  occupation: z.string().min(1, "Please enter your occupation"),
  peopleToOccupyProperty: z.string().min(1, "This field cannot be empty"),
  hasVehicle: z.enum(["yes", "no"], {
    message: "Please select either yes or no",
  }),
  hasPet: z.enum(["yes", "no"], {
    message: "Please select either yes or no",
  }),
  beenEvicted: z.enum(["yes", "no"], {
    message: "Please select either yes or no",
  }),
  paymentMethod: z.enum(
    ["Zelle", "Apple Pay", "Cash App", "Venmo", "Chime", "Paypal"],
    {
      message: "Please select a payment method",
    },
  ),
  movingDate: z.string().min(1, "Please select a moving date"),
  signature: z.string().min(1, "Signature is required"),
});

type FormValues = z.infer<typeof schema>;

const inputStyle =
  "mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none";
const inputWrapper = "mt-5";

export default function FormSection() {
  const sigRef = useRef<SignatureCanvas | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSignatureSaved, setIsSignatureSaved] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      hasVehicle: undefined,
      hasPet: undefined,
      beenEvicted: undefined,
      paymentMethod: undefined,
    },
  });

  const watchedValues = watch();

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    setIsLoading(true);
    try {
      const res = await fetch("/api/user/applications", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const response = await res.json();
      if (res.ok) {
        toast.success("Application submitted successfully!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveSignature = () => {
    if (sigRef.current) {
      const canvas = sigRef.current.getCanvas();
      const data = canvas.toDataURL("image/jpeg", 0.6);
      setValue("signature", data, { shouldValidate: true });
      setIsSignatureSaved(true);
      toast.success("Signature saved!");
    }
  };

  const clearSignature = () => {
    sigRef.current?.clear();
    setValue("signature", "");
    setIsSignatureSaved(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center my-8">
          <img
            src="/grand-estate.jpeg"
            alt="Property"
            className="w-80 h-50 object-cover rounded-lg"
          />
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-6 sm:p-8 space-y-6">
            {/* Personal Information Section */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
                <User className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Personal Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("firstName")}
                    className={inputStyle}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <span>⚠️</span> {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("lastName")}
                    className={inputStyle}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <span>⚠️</span> {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      {...register("email")}
                      className={`${inputStyle} pl-9`}
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <span>⚠️</span> {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      {...register("phone")}
                      className={`${inputStyle} pl-9`}
                      placeholder="1234567890"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <span>⚠️</span> {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Employment & Residence */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Employment & Residence
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Occupation / Job Title{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("occupation")}
                    className={inputStyle}
                    placeholder="Software Engineer"
                  />
                  {errors.occupation && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.occupation.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    People to Occupy <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      {...register("peopleToOccupyProperty")}
                      className={`${inputStyle} pl-9`}
                      placeholder="2"
                    />
                  </div>
                  {errors.peopleToOccupyProperty && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.peopleToOccupyProperty.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Moving Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    {...register("movingDate")}
                    className={`${inputStyle} pl-9`}
                  />
                </div>
                {errors.movingDate && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.movingDate.message}
                  </p>
                )}
              </div>
            </div>

            {/* Preferences Section */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
                <Car className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Preferences & History
                </h2>
              </div>

              {/* Radio Group Component */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  {
                    icon: Car,
                    name: "hasVehicle",
                    label: "Do you have a vehicle?",
                  },
                  {
                    icon: PawPrint,
                    name: "hasPet",
                    label: "Do you have a pet?",
                  },
                  {
                    icon: Gavel,
                    name: "beenEvicted",
                    label: "Have you been evicted before?",
                  },
                ].map(({ icon: Icon, name, label }) => (
                  <div key={name} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="w-4 h-4 text-blue-600" />
                      <label className="text-sm font-medium text-gray-700">
                        {label} <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="flex gap-4">
                      {["yes", "no"].map((value) => (
                        <label
                          key={value}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            value={value}
                            {...register(name as keyof FormValues)}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700 capitalize">
                            {value}
                          </span>
                        </label>
                      ))}
                    </div>
                    {errors[name as keyof FormValues] && (
                      <p className="text-red-500 text-xs mt-2">
                        {errors[name as keyof FormValues]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Payment Information
                </h2>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Note:</span> The application
                  fee is refundable if you don't like the house or don't get
                  approved.
                </p>
              </div>

              <label className="block text-sm font-medium text-gray-700 mb-3">
                Payment Method <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  "Zelle",
                  "Apple Pay",
                  "Cash App",
                  "Venmo",
                  "Chime",
                  "Paypal",
                ].map((method) => (
                  <label
                    key={method}
                    className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      watchedValues.paymentMethod === method
                        ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                        : "border-gray-300 hover:border-blue-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      value={method}
                      {...register("paymentMethod")}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{method}</span>
                  </label>
                ))}
              </div>
              {errors.paymentMethod && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.paymentMethod.message}
                </p>
              )}
            </div>

            {/* Signature Section */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
                <PenTool className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Signature
                </h2>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
                <SignatureCanvas
                  ref={sigRef}
                  penColor="black"
                  canvasProps={{
                    className: "w-full h-48 bg-white rounded-lg shadow-inner",
                  }}
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={clearSignature}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={saveSignature}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  {isSignatureSaved && <CheckCircle className="w-4 h-4" />}
                  Save Signature
                </button>
              </div>

              {errors.signature && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <span>⚠️</span> {errors.signature.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-gray-50 px-6 sm:px-8 py-5 border-t border-gray-200">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Submit Application
                </>
              )}
            </button>
            <p className="text-xs text-gray-500 text-center mt-3">
              By submitting this form, you confirm that the information provided
              is accurate and complete.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
