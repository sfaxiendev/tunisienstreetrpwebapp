
import React, { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useAuth } from "../../hooks/useAuth";
import { ChevronLeft, ChevronRight, Send, AlertCircle } from "lucide-react";

// Define form schema with validation
const formSchema = z.object({
  // Step 1
  realName: z.string().min(2, { message: "Name must be at least 2 characters" }).max(50),
  realAge: z.string().refine((val) => {
    const age = parseInt(val);
    return !isNaN(age) && age >= 16 && age <= 99;
  }, { message: "You must be at least 16 years old" }),
  characterName: z.string().min(2, { message: "Character name must be at least 2 characters" }).max(50),
  characterBackstory: z.string().min(100, { message: "Backstory must be at least 100 characters" }).max(2000),
  characterObjective: z.string().min(50, { message: "Objective must be at least 50 characters" }).max(1000),
  hostageCount: z.string().refine((val) => {
    const count = parseInt(val);
    return !isNaN(count) && count >= 1;
  }, { message: "Please specify a valid number" }),
  
  // Step 2
  failRpExample: z.string().min(50, { message: "Example must be at least 50 characters" }),
  painRpExample: z.string().min(50, { message: "Example must be at least 50 characters" }),
  faireRpExample: z.string().min(50, { message: "Example must be at least 50 characters" }),
  
  // Step 3
  robberyPlan: z.string().min(200, { message: "Plan must be at least 200 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const WhitelistForm = () => {
  const { isAuthenticated, user } = useAuth();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid }, 
    trigger, 
    getValues,
    reset 
  } = useForm<FormValues>({ 
    resolver: zodResolver(formSchema),
    mode: "onChange" 
  });

  const totalSteps = 3;

  const nextStep = async () => {
    // Validate current step fields before proceeding
    const fieldsToValidate = {
      1: ["realName", "realAge", "characterName", "characterBackstory", "characterObjective", "hostageCount"],
      2: ["failRpExample", "painRpExample", "faireRpExample"],
      3: ["robberyPlan"]
    }[step] as Array<keyof FormValues>;
    
    const isStepValid = await trigger(fieldsToValidate);
    
    if (isStepValid) {
      setStep((prevStep) => prevStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
    window.scrollTo(0, 0);
  };
  
  const onSubmit = async (data: FieldValues) => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to submit an application");
      return;
    }

    setSubmitting(true);
    
    try {
      // In a real app, this would send data to Discord via API
      console.log("Submitting application:", data);
      console.log("User:", user);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Application submitted successfully!");
      reset();
      setStep(1);
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
    <div>
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-tunisien-gray">
            Step {step} of {totalSteps}
          </span>
          <span className="text-sm text-tunisien-gray">
            {Math.round((step / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-tunisien-red transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h3 className="text-xl font-bold mb-6 pb-2 border-b border-tunisien-red/30">Personal Information</h3>
            
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
                  min="16"
                  max="99"
                  className={`ts-input w-full ${errors.realAge ? "border-red-500" : ""}`}
                  placeholder="Enter your age"
                  {...register("realAge")}
                />
                {errors.realAge && (
                  <p className="error-text">{errors.realAge.message}</p>
                )}
              </div>
            </div>

            <div className="form-group mt-4">
              <label htmlFor="characterName">Character Name</label>
              <input 
                id="characterName"
                type="text"
                className={`ts-input w-full ${errors.characterName ? "border-red-500" : ""}`}
                placeholder="Enter your character's full name"
                {...register("characterName")}
              />
              {errors.characterName && (
                <p className="error-text">{errors.characterName.message}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="characterBackstory">Character Backstory</label>
              <textarea 
                id="characterBackstory"
                rows={6}
                className={`ts-input w-full ${errors.characterBackstory ? "border-red-500" : ""}`}
                placeholder="Write your character's detailed backstory..."
                {...register("characterBackstory")}
              ></textarea>
              {errors.characterBackstory && (
                <p className="error-text">{errors.characterBackstory.message}</p>
              )}
              <p className="text-xs text-tunisien-gray mt-1">
                Minimum 100 characters. Current: {getValues("characterBackstory")?.length || 0}
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="characterObjective">Character Objectives</label>
              <textarea 
                id="characterObjective"
                rows={4}
                className={`ts-input w-full ${errors.characterObjective ? "border-red-500" : ""}`}
                placeholder="What are your character's goals and motivations?"
                {...register("characterObjective")}
              ></textarea>
              {errors.characterObjective && (
                <p className="error-text">{errors.characterObjective.message}</p>
              )}
              <p className="text-xs text-tunisien-gray mt-1">
                Minimum 50 characters. Current: {getValues("characterObjective")?.length || 0}
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="hostageCount">How many hostages are needed in a large robbery?</label>
              <input 
                id="hostageCount"
                type="number"
                min="1"
                className={`ts-input w-full ${errors.hostageCount ? "border-red-500" : ""}`}
                placeholder="Enter number"
                {...register("hostageCount")}
              />
              {errors.hostageCount && (
                <p className="error-text">{errors.hostageCount.message}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: RP Examples */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h3 className="text-xl font-bold mb-6 pb-2 border-b border-tunisien-red/30">Roleplay Knowledge</h3>
            
            <div className="bg-tunisien-red/5 border border-tunisien-red/20 rounded-lg p-4 mb-6">
              <p className="text-white">
                For each scenario below, explain what these terms mean and provide examples of how they occur in roleplay.
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="failRpExample">Give examples of these RP fails: FAIL RP + FORCE RP + META GAMING</label>
              <textarea 
                id="failRpExample"
                rows={5}
                className={`ts-input w-full ${errors.failRpExample ? "border-red-500" : ""}`}
                placeholder="Explain these concepts with examples..."
                {...register("failRpExample")}
              ></textarea>
              {errors.failRpExample && (
                <p className="error-text">{errors.failRpExample.message}</p>
              )}
              <p className="text-xs text-tunisien-gray mt-1">
                Minimum 50 characters. Current: {getValues("failRpExample")?.length || 0}
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="painRpExample">Give examples of these RP fails: PAIN RP + FAIL DRIVE</label>
              <textarea 
                id="painRpExample"
                rows={5}
                className={`ts-input w-full ${errors.painRpExample ? "border-red-500" : ""}`}
                placeholder="Explain these concepts with examples..."
                {...register("painRpExample")}
              ></textarea>
              {errors.painRpExample && (
                <p className="error-text">{errors.painRpExample.message}</p>
              )}
              <p className="text-xs text-tunisien-gray mt-1">
                Minimum 50 characters. Current: {getValues("painRpExample")?.length || 0}
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="faireRpExample">Give examples of this RP fail: FAIRE RP</label>
              <textarea 
                id="faireRpExample"
                rows={5}
                className={`ts-input w-full ${errors.faireRpExample ? "border-red-500" : ""}`}
                placeholder="Explain this concept with examples..."
                {...register("faireRpExample")}
              ></textarea>
              {errors.faireRpExample && (
                <p className="error-text">{errors.faireRpExample.message}</p>
              )}
              <p className="text-xs text-tunisien-gray mt-1">
                Minimum 50 characters. Current: {getValues("faireRpExample")?.length || 0}
              </p>
            </div>
          </div>
        )}

        {/* Step 3: RP Scenario */}
        {step === 3 && (
          <div className="animate-fade-in">
            <h3 className="text-xl font-bold mb-6 pb-2 border-b border-tunisien-red/30">Roleplay Scenario</h3>
            
            <div className="bg-tunisien-red/5 border border-tunisien-red/20 rounded-lg p-4 mb-6">
              <p className="text-white">
                Create a detailed scenario for a big robbery, including complete planning and execution steps.
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="robberyPlan">Robbery Plan</label>
              <textarea 
                id="robberyPlan"
                rows={10}
                className={`ts-input w-full ${errors.robberyPlan ? "border-red-500" : ""}`}
                placeholder="Detail your complete plan for a major robbery..."
                {...register("robberyPlan")}
              ></textarea>
              {errors.robberyPlan && (
                <p className="error-text">{errors.robberyPlan.message}</p>
              )}
              <p className="text-xs text-tunisien-gray mt-1">
                Minimum 200 characters. Current: {getValues("robberyPlan")?.length || 0}
              </p>
            </div>
            
            <div className="bg-secondary rounded-lg border border-tunisien-red/20 p-4 mt-6">
              <p className="text-sm text-tunisien-gray mb-2">
                By submitting this application, you agree to the following:
              </p>
              <ul className="list-disc pl-5 text-sm text-tunisien-gray space-y-1">
                <li>The information provided is accurate to the best of your knowledge</li>
                <li>You have read and agree to follow all server rules</li>
                <li>Staff may contact you via Discord for further information</li>
                <li>The decision of the staff regarding your application is final</li>
              </ul>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="ts-btn-secondary flex items-center gap-2"
            >
              <ChevronLeft size={16} /> Previous
            </button>
          ) : (
            <div></div>
          )}

          {step < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className="ts-btn-primary flex items-center gap-2"
            >
              Next <ChevronRight size={16} />
            </button>
          ) : (
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
          )}
        </div>
      </form>
    </div>
  );
};

export default WhitelistForm;
