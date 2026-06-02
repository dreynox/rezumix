

export default function PrivacyPolicy() {
    const rezumixEmail = "rezumix.ai@gmail.com"

    return (
        <div className="max-w-4xl mx-auto pt-26 p-6 text-gray-200">
            <h1 className="text-4xl font-bold mb-6 text-white">Privacy Policy</h1>

            <p className="mb-4">
                Welcome to <strong>Rezumix</strong>. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal data when you use our services, including resume analysis, personality prediction, and career recommendations.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
            <ul className="list-disc ml-6 mb-4">
                <li><strong>Personal Information:</strong> Name, email address, and contact details when you sign up.</li>
                <li><strong>Resume Data:</strong> Uploaded resumes, job preferences, and education/work experience.</li>
                <li><strong>Personality Responses:</strong> Answers to personality tests and AI chats.</li>
                <li><strong>Usage Data:</strong> Logs of your activity to improve user experience.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-2">2. How We Use Your Data</h2>
            <ul className="list-disc ml-6 mb-4">
                <li>To analyze your resume and suggest improvements.</li>
                <li>To generate personality insights and career recommendations.</li>
                <li>To enhance our AI services based on your interactions.</li>
                <li>To communicate with you about updates, features, and support.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-2">3. Data Sharing & Disclosure</h2>
            <p className="mb-4">
                We do <strong>not sell</strong> your data. Your information may be shared only with trusted service providers (e.g., AI APIs) to deliver our core functionality. We ensure all partners maintain data confidentiality.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">4. Data Security</h2>
            <p className="mb-4">
                We use encryption and secure storage practices to protect your data. However, no method of transmission over the Internet is 100% secure.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">5. Your Rights</h2>
            <ul className="list-disc ml-6 mb-4">
                <li>Access or update your personal information at any time.</li>
                <li>Request deletion of your account and data.</li>
                <li>Withdraw consent for AI analysis or personality assessments.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-2">6. Cookies</h2>
            <p className="mb-4">
                We may use cookies to remember your preferences and enhance your experience. You can control cookie settings through your browser.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">7. Children&apos;s Privacy</h2>
            <p className="mb-4">
                Rezumix is not intended for users under the age of 13. We do not knowingly collect personal information from children.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">8. Changes to This Policy</h2>
            <p className="mb-4">
                We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised date.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">9. Contact Us</h2>
            <p className="mb-4">
                If you have questions or concerns about our privacy practices, please email us at <a href={`mailto:${rezumixEmail}`} className="text-blue-500 underline">{rezumixEmail}</a>.
            </p>
        </div>
    );
}
