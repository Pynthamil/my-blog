import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface BlogNotificationProps {
  postTitle?: string;
  postDescription?: string;
  postCoverImage?: string;
  postUrl?: string;
}

/**
 * Minimalist Email Template for pyndu_logs
 * Designed with a premium, Apple-style aesthetic.
 */
export const BlogNotification = ({
  postTitle = "The Art of Committing",
  postDescription = "Version control, but make it make sense. Committing isn't just saving code — it's documenting your thinking, your experiments, and sometimes your chaos.",
  postCoverImage = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
  postUrl = "https://pyndu.dev",
}: BlogNotificationProps) => (
  <Html>
    <Tailwind>
      <Head />
      <Preview>{postTitle}</Preview>
      <Body className="bg-[#f8f8fa] my-auto mx-auto font-sans px-2">
        <Container className="border border-solid border-[#eaeaea] rounded-[24px] my-[40px] mx-auto p-[32px] max-w-[550px] bg-white shadow-xl">
          {/* Hero Section */}
          <Section className="mt-[8px]">
            <Img
              src={postCoverImage}
              width="100%"
              height="auto"
              alt="Post Cover"
              className="my-0 mx-auto rounded-[14px] shadow-sm"
            />
          </Section>
          
          {/* Content Section */}
          <Section className="mt-[32px]">
            <Heading className="text-[#0b0b0f] text-[28px] font-bold text-start p-0 my-0 mx-0 tracking-tight leading-tight">
              {postTitle}
            </Heading>
            <Text className="text-[#3f3f46] text-[16px] leading-[28px] mt-[16px] font-medium">
              {postDescription}
            </Text>
          </Section>

          {/* Primary CTA */}
          <Section className="text-center mt-[40px] mb-[10px]">
            <Button
              className="bg-[#A78BFA] rounded-[12px] text-white text-[14px] font-bold no-underline text-center px-10 py-5 uppercase tracking-widest shadow-lg"
              href={postUrl}
            >
              Visit my post
            </Button>
          </Section>

          <Hr className="border border-solid border-[#eaeaea] my-[40px] mx-0 w-full" />
          
          {/* Footer Section */}
          <Section className="text-center">
             <Text className="text-[#0b0b0f] text-[18px] font-bold mb-2 tracking-tighter">
               pyndu_logs
             </Text>
             <Section className="mb-6">
                <Link href="https://github.com" className="text-[#71717a] text-[12px] font-semibold mx-2 no-underline hover:text-[#A78BFA]">GitHub</Link>
                <Link href="https://linkedin.com" className="text-[#71717a] text-[12px] font-semibold mx-2 no-underline hover:text-[#A78BFA]">LinkedIn</Link>
                <Link href="https://twitter.com" className="text-[#71717a] text-[12px] font-semibold mx-2 no-underline hover:text-[#A78BFA]">Twitter</Link>
                <Link href="https://pyndu.dev" className="text-[#71717a] text-[12px] font-semibold mx-2 no-underline hover:text-[#A78BFA]">Portfolio</Link>
             </Section>
             <Text className="text-[#aeaeae] text-[11px] leading-[20px] uppercase tracking-widest">
               You received this because you are part of the pyndu_logs community.
               <br />
               <Link href="#" className="text-[#A78BFA] underline ml-1">Unsubscribe</Link>
             </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default BlogNotification;
