
import React, { useState } from "react";
import { useForm, FieldValues, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useAuth } from "../../hooks/useAuth";
import { AlertCircle, Send, X, Plus, User } from "lucide-react";

// Define form schema with validation
const formSchema = z.object({
  gangName: z.string().min(2, { message: "Gang name must be at least 2 characters" }).max(50),
  bossName: z.string().min(2, { message: "Boss name must be at least 2 characters" }).max(50),
  members: z.array(
    z.object({
      discordId: z.string().min(2, { message: "Discord ID is required" }).max(50),
    })
  ).min(1, { message: "At least one member is required" }),
  gangBackstory: z.string().min(200, { message: "Backstory must be at least 200 characters" }).max(3000),
  gangOrigin: z.string().min(2, { message: "Origin must be at least 2 characters" }).max(50),
});

type FormValues = z.infer<typeof formSchema>;

const GangForm = () => {
  const { isAuthenticated, user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    control,
    formState: { errors }, 
    reset,
    getValues
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      members: [{ discordId: "" }]
    }
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  const addMember = () => {
    append({ discordId: "" });
  };

  const onSubmit = async (data: FieldValues) => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to submit an application");
      return;
    }

    setSubmitting(true);
    
    try {
      // In a real app, this would send data to Discord via API
      console.log("Submitting gang application:", data);
      console.log("User:", user);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Gang application submitted successfully!");
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
          Create your own gang on TUNISIEN STREET RP. Your application will be reviewed by our staff team.
          Make sure to provide detailed information to increase your chances of approval.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <label htmlFor="gangName">Gang Name</label>
          <input 
            id="gangName"
            type="text"
            className={`ts-input w-full ${errors.gangName ? "border-red-500" : ""}`}
            placeholder="Enter your gang's name"
            {...register("gangName")}
          />
          {errors.gangName && (
            <p className="error-text">{errors.gangName.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="bossName">Boss Name Or Discord ID</label>
          <input 
            id="bossName"
            type="text"
            className={`ts-input w-full ${errors.bossName ? "border-red-500" : ""}`}
            placeholder="Enter the gang boss's name or discord id"
            {...register("bossName")}
          />
          {errors.bossName && (
            <p className="error-text">{errors.bossName.message}</p>
          )}
        </div>
      </div>

      <div className="form-group mt-4">
        <label>Gang Members (Discord IDs)</label>
        
        <div className="bg-secondary rounded-lg border border-tunisien-red/20 p-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-3 mb-3">
              <User size={16} className="text-tunisien-gray flex-shrink-0" />
              <input
                type="text"
                className={`ts-input w-full ${
                  errors.members?.[index]?.discordId ? "border-red-500" : ""
                }`}
                placeholder="Discord ID (1234567891011)"
                {...register(`members.${index}.discordId`)}
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-tunisien-red/10 hover:bg-tunisien-red/20 text-tunisien-red p-1.5 rounded-md transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ))}
          
          {errors.members && typeof errors.members.message === 'string' && (
            <p className="error-text mb-2">{errors.members.message}</p>
          )}
          
          <button
            type="button"
            onClick={addMember}
            className="flex items-center gap-2 text-sm text-tunisien-red hover:text-tunisien-red/80 transition-colors"
          >
            <Plus size={16} />
            <span>Add Member</span>
          </button>
        </div>
      </div>

      <div className="form-group mt-4">
        <label htmlFor="gangOrigin">Gang Origin (Country)</label>
        <input 
          id="gangOrigin"
          type="text"
          className={`ts-input w-full ${errors.gangOrigin ? "border-red-500" : ""}`}
          placeholder="Enter the country of origin"
          {...register("gangOrigin")}
        />
        {errors.gangOrigin && (
          <p className="error-text">{errors.gangOrigin.message}</p>
        )}
      </div>

      <div className="form-group mt-4">
        <label htmlFor="gangBackstory">Gang Backstory</label>
        <textarea 
          id="gangBackstory"
          rows={8}
          className={`ts-input w-full ${errors.gangBackstory ? "border-red-500" : ""}`}
          placeholder="Write your gang's detailed backstory, including how it was formed, its purpose, and notable events in its history..."
          {...register("gangBackstory")}
        ></textarea>
        {errors.gangBackstory && (
          <p className="error-text">{errors.gangBackstory.message}</p>
        )}
        <p className="text-xs text-tunisien-gray mt-1">
          Minimum 200 characters. Current: {getValues("gangBackstory")?.length || 0}
        </p>
      </div>
      
      <div className="bg-secondary rounded-lg border border-tunisien-red/20 p-4 mt-6 mb-6">
        <p className="text-sm text-tunisien-gray mb-2">
          By submitting this gang application, you acknowledge:
        </p>
        <ul className="list-disc pl-5 text-sm text-tunisien-gray space-y-1">
          <li>Your gang must follow all server rules and roleplay guidelines</li>
          <li>Gang activity should enhance server roleplay, not disrupt it</li>
          <li>Staff may contact you for additional information or changes</li>
          <li>Approval of your gang does not grant permission for rule-breaking</li>
          <li>All members must be actual players with active whitelists</li>
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

export default GangForm;
