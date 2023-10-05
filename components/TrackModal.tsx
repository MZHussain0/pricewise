"use client";
import { addUserEmailToProduct } from "@/lib/actions";
import { MailCheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type Props = {
  productId: string;
};

const TrackModal = ({ productId }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  if (!isMounted) return null;

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsSubmitting(true);

    await addUserEmailToProduct(productId, email);

    setIsSubmitting(false);
    setEmail("");
  };
  return (
    <Dialog>
      <DialogTrigger className="w-full">Track this product</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mt-4">
            Stay updated with product pricing alerts right in your inbox
          </DialogTitle>
          <DialogDescription>
            Enter your email to track this product. Never miss a bargain with
            our timely alerts.
          </DialogDescription>

          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="email" className="text-right">
                <MailCheckIcon />
              </Label>
              <Input
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={isSubmitting} type="submit" onClick={handleSubmit}>
            Start tracking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TrackModal;
