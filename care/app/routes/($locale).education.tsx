import { useState, Suspense } from 'react';
import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, Await } from '@remix-run/react';
// Removed ReactMarkdown import
// import * as ReactMarkdownLib from 'react-markdown'; 

// --- Course Data Structure (example) ---
interface CourseModule {
  id: number;
  title: string;
  content: string; // Raw markdown content for the module
  assessmentType?: 'quiz' | 'caseStudy' | 'exercise';
}

// --- Loader Function ---
export async function loader({ context, request }: LoaderFunctionArgs) {
  // Fetch the markdown file from the public directory
  const courseFileUrl = new URL('/docs/salon-course-plan.md', request.url).toString();
  let rawMarkdown = '';
  try {
    const response = await fetch(courseFileUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch course content: ${response.statusText}`);
    }
    rawMarkdown = await response.text();
  } catch (error) {
    console.error("Failed to fetch course markdown:", error);
    throw new Response("Could not load course content.", { status: 500 });
  }

  // --- Basic Markdown Parsing (Example) ---
  const modules: CourseModule[] = [];
  const lines = rawMarkdown.split('\n');
  let currentModule: Partial<CourseModule> = {};
  let contentBuffer: string[] = [];
  const moduleTitleRegex = /^\*\s+\*\*Module (\d+): (.*?)\*\*/;

  for (const line of lines) {
    const match = line.match(moduleTitleRegex);
    if (match) {
      if (currentModule.id) {
        currentModule.content = contentBuffer.join('\n').trim();
        modules.push(currentModule as CourseModule);
      }
      currentModule = {
        id: parseInt(match[1], 10),
        title: match[2].trim(),
      };
      contentBuffer = [];
    } else if (currentModule.id) {
      contentBuffer.push(line);
    }
  }
  if (currentModule.id) {
    currentModule.content = contentBuffer.join('\n').trim();
    modules.push(currentModule as CourseModule);
  }

  return json({ modules });
}

// --- SalonCourse Component ---
// Removed ReactMarkdown workaround
// const ReactMarkdown = ReactMarkdownLib.default || ReactMarkdownLib;

function SalonCourse({ modules }: { modules: CourseModule[] }) {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);

  if (!modules || modules.length === 0) {
    return <p>Course content is unavailable. Please try again later.</p>;
  }

  const currentModule = modules[currentModuleIndex];
  const totalModules = modules.length;
  const isLastModule = currentModuleIndex === totalModules - 1;

  const goToNextModule = () => {
    setCurrentModuleIndex((prev) => Math.min(prev + 1, totalModules - 1));
  };

  const goToPreviousModule = () => {
    setCurrentModuleIndex((prev) => Math.max(0, prev - 1));
  };

  const handleCompleteCourse = () => {
    // TODO: Implement actual completion logic
    alert(
      `Congratulations on completing the course! \n\nAs a thank you, enjoy 15% off your first wholesale order. \n(Details on how to redeem will be shown here).`
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Module {currentModule.id}: {currentModule.title}</h2>
      <div className="prose prose-lg max-w-none bg-white p-6 rounded-md shadow-sm border border-gray-200">
        {/* Placeholder rendering using <pre> */}
        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          {currentModule.content || "No content available for this module."}
        </pre>
      </div>
      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t">
        <button
          onClick={goToPreviousModule}
          disabled={currentModuleIndex === 0}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-300"
        >
          Previous
        </button>
        <span className="text-sm text-gray-500">
          Module {currentModuleIndex + 1} of {totalModules}
        </span>
        {isLastModule ? (
          <button 
            onClick={handleCompleteCourse}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Complete Course & Get Discount
          </button>
        ) : (
          <button 
            onClick={goToNextModule} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Next Module
          </button>
        )}
      </div>
    </div>
  );
}

// --- Route Component ---
export default function EducationRoute() {
  // Use the resolved loader data directly inside Await
  const loaderDataPromise = useLoaderData<typeof loader>();
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Salon Professional Education Course</h1>
      <Suspense fallback={<p>Loading course content...</p>}>
         {/* Pass the promise directly to Await's resolve prop */}
        <Await resolve={loaderDataPromise}>
           {/* Render function receives the resolved data */}
           {(resolvedData) => <SalonCourse modules={resolvedData.modules} />}
        </Await>
      </Suspense>
    </div>
  );
} 