import { Appbar } from "./components/Appbar";
import { Code, Database, Zap, Globe } from "lucide-react";

export default function APIDocumentation() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Appbar />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl mb-4">
               Muzer Backend API
             </h1>
             <p className="text-xl text-gray-300 mb-6">
               A comprehensive backend API for music streaming with automatic user authentication,
               stream management, and voting system. No manual user ID required - everything is handled through your session!
             </p>
            <div className="bg-gray-800/50 rounded-lg p-4 inline-block">
              <p className="text-green-400 font-mono text-lg">
                🚀 Server Running: http://localhost:3000
              </p>
            </div>

            
            {/* Sign In Instructions */}
              <div className="bg-blue-600/20 border border-blue-500 rounded-lg p-4 mt-4 max-w-3xl mx-auto">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">🔐 How to Sign In</h3>
                <ol className="list-decimal list-inside space-y-1 text-gray-300 text-sm">
                  <li>Click the "Sign In" button in the top-right corner</li>
                  <li>Sign in with your Google account</li>
                  <li>Start testing the API endpoints below</li>
                </ol>
                <p className="text-yellow-400 text-xs mt-2">
                  <strong>For Postman:</strong> Copy session cookies from browser after signing in.
                </p>
              </div>
          </div>

          {/* API Endpoints Section */}
          <div className="grid gap-8 mb-12">
            <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <Database className="h-8 w-8 text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Streams API</h2>
              </div>
              
              <div className="space-y-6">
                {/* GET Streams */}
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-mono mr-3">GET</span>
                    <code className="text-green-400 font-mono">/api/streams</code>
                  </div>
                  <p className="text-gray-300 mb-3">Fetch all streams for the authenticated user</p>
                  <div className="bg-gray-800 rounded p-3">
                    <p className="text-sm text-gray-400 mb-2">Example Request:</p>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm">GET</span>
                      <code className="text-yellow-300 text-sm bg-gray-700 px-2 py-1 rounded select-all">
                        http://localhost:3000/api/streams
                      </code>
                    </div>
                  </div>
                  <p className="text-yellow-400 text-sm mt-2">🔐 Requires authentication - User automatically identified from session</p>
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded p-3 mt-3">
                    <p className="text-sm text-blue-400 mb-1">💡 <strong>Need your User ID?</strong></p>
                    <p className="text-sm text-gray-300">After signing in, check the browser's developer console or use Prisma Studio to find your user ID in the database.</p>
                  </div>
                </div>

                {/* POST Streams */}
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-mono mr-3">POST</span>
                    <code className="text-blue-400 font-mono">/api/streams</code>
                  </div>
                  <p className="text-gray-300 mb-3">Add a new stream from YouTube</p>
                  <div className="bg-gray-800 rounded p-3">
                    <p className="text-sm text-gray-400 mb-2">Request Body:</p>
                    <pre className="text-yellow-300 text-sm">
{`{
  "url": "https://www.youtube.com/watch?v=VIDEO_ID"
}`}
                    </pre>
                  </div>
                  <p className="text-yellow-400 text-sm mt-2">🔐 Requires authentication - User ID extracted from session</p>
                </div>
              </div>
              

            </div>

            {/* Voting API */}
            <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <Zap className="h-8 w-8 text-yellow-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Voting API</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Upvote */}
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-mono mr-3">POST</span>
                    <code className="text-blue-400 font-mono text-sm">/api/streams/upvote</code>
                  </div>
                  <p className="text-gray-300 mb-3">Give an upvote to a stream</p>
                  <div className="bg-gray-800 rounded p-3">
                    <pre className="text-yellow-300 text-sm">
{`{
  "streamId": "stream-id"
}`}
                    </pre>
                  </div>
                  <p className="text-yellow-400 text-sm mt-2">🔐 Requires authentication - User ID extracted from session</p>
                </div>

                {/* Downvote */}
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-mono mr-3">POST</span>
                    <code className="text-blue-400 font-mono text-sm">/api/streams/downvote</code>
                  </div>
                  <p className="text-gray-300 mb-3">Remove upvote from a stream</p>
                  <div className="bg-gray-800 rounded p-3">
                    <pre className="text-yellow-300 text-sm">
{`{
  "streamId": "stream-id"
}`}
                    </pre>
                  </div>
                  <p className="text-yellow-400 text-sm mt-2">🔐 Requires authentication - User ID extracted from session</p>
                </div>
              </div>
              
              {/* Voting Rules Explanation */}
              <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">📋 How Voting Works</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-start">
                    <span className="text-green-400 mr-2">👍</span>
                    <div>
                      <p className="font-medium text-white">Upvoting:</p>
                      <p className="text-sm">You can upvote each stream only <strong>once</strong>. If you try to upvote the same stream again, you'll get a "Already upvoted" response.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-red-400 mr-2">👎</span>
                    <div>
                      <p className="font-medium text-white">Downvoting:</p>
                      <p className="text-sm">Downvoting <strong>removes your upvote</strong> from a stream. You can only downvote streams that you have previously upvoted.</p>
                    </div>
                  </div>
                  <div className="bg-gray-800/50 rounded p-3 mt-4">
                    <p className="text-sm text-yellow-400">💡 <strong>Example Flow:</strong> Upvote → Stream gets +1 vote → Downvote → Your upvote is removed → Stream returns to original vote count</p>
                  </div>
                </div>
              </div>
            </div>
          </div>



          {/* Tech Stack */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Tech Stack</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-blue-600 text-white px-4 py-2 rounded-full">Next.js 15</span>
              <span className="bg-purple-600 text-white px-4 py-2 rounded-full">Prisma ORM</span>
              <span className="bg-green-600 text-white px-4 py-2 rounded-full">PostgreSQL</span>
              <span className="bg-yellow-600 text-white px-4 py-2 rounded-full">NextAuth.js</span>
              <span className="bg-red-600 text-white px-4 py-2 rounded-full">Zod Validation</span>
              <span className="bg-indigo-600 text-white px-4 py-2 rounded-full">TypeScript</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
