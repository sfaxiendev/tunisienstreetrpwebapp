
import React, { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useAuth } from "../../hooks/useAuth";
import { AlertCircle, Send } from "lucide-react";

// Define form schema with validation
const formSchema = z.object({
  realName: z.string().min(2, { message: "Name must be at least 2 characters" }).max(50),
  realAge: z.string().refine((val) => {
    const age = parseInt(val);
    return !isNaN(age) && age >= 18 && age <= 99;
  }, { message: "You must be at least 18 years old" }),
  joinReason: z.string().min(100, { message: "Reason must be at least 100 characters" }).max(2000),
  priorExperience: z.enum(["yes", "no"]),
  conflictHandling: z.enum(["yes", "no"]),
});

type FormValues = z.infer<typeof formSchema>;

const AdminForm = () => {
  const { isAuthenticated, user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset,
    getValues
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to submit an application");
      return;
    }

    setSubmitting(true);
    
    try {
      // In a real app, this would send data to Discord via API
      console.log("Submitting admin application:", data);
      console.log("User:", user);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Admin application submitted successfully!");
      reset();
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  
  if (!isAuthenticated) {
    return (
      <div className="bg-secondary rounded-lg border border-tunisien-red/20 p-8 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-tunisien-red mb-4" />
        <h3 className="text-xl font-bold mb-2">Authentication Required</h3>
        <p className="text-tunisien-gray mb-6">You need to log in with Discord before submitting an application.</p>
        <button
          onClick={() => window.location.href = "/"}
          className="ts-btn-primary"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-tunisien-red/5 border border-tunisien-red/20 rounded-lg p-4 mb-6">
        <p className="text-white">
          Admin positions require dedication, maturity, and a strong understanding of roleplay principles.
          Please complete this application honestly and thoroughly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <label htmlFor="realName">Real Name</label>
          <input 
            id="realName"
            type="text"
            className={`ts-input w-full ${errors.realName ? "border-red-500" : ""}`}
            placeholder="Enter your real name"
            {...register("realName")}
          />
          {errors.realName && (
            <p className="error-text">{errors.realName.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="realAge">Real Age</label>
          <input 
            id="realAge"
            type="number"
            min="18"
            max="99"
            className={`ts-input w-full ${errors.realAge ? "border-red-500" : ""}`}
            placeholder="Enter your age"
            {...register("realAge")}
          />
          {errors.realAge && (
            <p className="error-text">{errors.realAge.message}</p>
          )}
          <p className="text-xs text-tunisien-gray mt-1">Admin applicants must be at least 18 years old</p>
        </div>
      </div>

      <div className="form-group mt-4">
        <label htmlFor="joinReason">Why do you want to be part of our admin team?</label>
        <textarea 
          id="joinReason"
          rows={6}
          className={`ts-input w-full ${errors.joinReason ? "border-red-500" : ""}`}
          placeholder="Explain your motivations, relevant experience, strengths, and what you can bring to the team..."
          {...register("joinReason")}
        ></textarea>
        {errors.joinReason && (
          <p className="error-text">{errors.joinReason.message}</p>
        )}
        <p className="text-xs text-tunisien-gray mt-1">
          Minimum 100 characters. Current: {getValues("joinReason")?.length || 0}
        </p>
      </div>

      <div className="form-group">
        <label>Have you been an admin in other servers before?</label>
        <div className="flex gap-4 mt-2">
          <label className="flex items-center gap-2">
            <input 
              type="radio" 
              value="yes" 
              {...register("priorExperience")} 
              className="h-4 w-4 accent-tunisien-red"
            />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input 
              type="radio" 
              value="no" 
              {...register("priorExperience")}
              className="h-4 w-4 accent-tunisien-red" 
            />
            No
          </label>
        </div>
        {errors.priorExperience && (
          <p className="error-text">{errors.priorExperience.message}</p>
        )}
      </div>

      <div className="form-group">
        <label>Can you handle a situation where your faction is involved?</label>
        <div className="flex gap-4 mt-2">
          <label className="flex items-center gap-2">
            <input 
              type="radio" 
              value="yes" 
              {...register("conflictHandling")} 
              className="h-4 w-4 accent-tunisien-red"
            />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input 
              type="radio" 
              value="no" 
              {...register("conflictHandling")}
              className="h-4 w-4 accent-tunisien-red" 
            />
            No
          </label>
        </div>
        {errors.conflictHandling && (
          <p className="error-text">{errors.conflictHandling.message}</p>
        )}
      </div>
      
      <div className="bg-secondary rounded-lg border border-tunisien-red/20 p-4 mt-6 mb-6">
        <p className="text-sm text-tunisien-gray mb-2">
          By submitting this application, you acknowledge and agree to the following:
        </p>
        <ul className="list-disc pl-5 text-sm text-tunisien-gray space-y-1">
          <li>All information provided is truthful and accurate</li>
          <li>Admin positions require regular active presence on the server</li>
          <li>You will maintain professionalism and impartiality in all admin decisions</li>
          <li>You may be asked to participate in an interview over Discord</li>
          <li>The server management has final decision on all applications</li>
        </ul>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="ts-btn-primary flex items-center gap-2 disabled:opacity-70"
      >
        {submitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white"></div>
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <Send size={16} />
            <span>Submit Application</span>
          </>
        )}
      </button>
    </form>
  );
};

export default AdminForm;
