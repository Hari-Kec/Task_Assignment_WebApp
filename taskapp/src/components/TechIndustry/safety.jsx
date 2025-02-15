import React from 'react';
import { FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const safetyMeasures = [
  { title: "Data Breaches", description: "Implement strong encryption for data at rest and in transit, use multi-factor authentication (MFA), and regularly update security protocols." },
  { title: "Phishing Attacks", description: "Train employees on recognizing phishing attempts, use anti-phishing tools, and regularly update security software." },
  { title: "Malware Infections", description: "Use reputable antivirus software, keep all systems updated, and regularly back up data." },
  { title: "Unpatched Vulnerabilities", description: "Regularly apply patches and updates, use vulnerability management tools, and perform routine security audits." },
  { title: "Insecure APIs", description: "Implement secure coding practices, use API gateways, and regularly test APIs for vulnerabilities." },
  { title: "Insider Threats", description: "Implement least privilege access, monitor user activities, and conduct regular security training." },
  { title: "Network Attacks", description: "Use firewalls, intrusion detection/prevention systems, and ensure network segmentation." },
  { title: "Configuration Errors", description: "Follow best practices for system configurations, use automated configuration management tools, and regularly review configurations." },
  { title: "Poorly Managed Credentials", description: "Use password managers, enforce strong password policies, and implement MFA." },
  { title: "Data Loss", description: "Implement regular data backups, use redundant storage solutions, and test backup recovery procedures." },
  { title: "Uncontrolled Changes", description: "Use change management processes, document changes, and perform regular audits." },
  { title: "Code Vulnerabilities", description: "Implement secure coding practices, conduct regular code reviews, and use automated code analysis tools." },
  { title: "Lack of Monitoring", description: "Implement comprehensive monitoring and logging, use SIEM (Security Information and Event Management) systems, and set up alerts for unusual activities." },
  { title: "Insecure Development Practices", description: "Adopt secure development methodologies (e.g., DevSecOps), perform regular security testing, and involve security teams early in the development cycle." },
  { title: "Third-Party Risks", description: "Assess third-party security practices, use vendor risk management tools, and establish secure integration practices." },
  { title: "Lack of Incident Response Planning", description: "Develop and maintain an incident response plan, conduct regular drills, and ensure team members are trained." },
  { title: "Social Engineering", description: "Educate employees on social engineering tactics, use security awareness training, and enforce verification procedures." },
  { title: "Insecure Mobile Devices", description: "Implement mobile device management (MDM) solutions, enforce security policies for mobile devices, and ensure devices are regularly updated." },
  { title: "Weak Network Segmentation", description: "Implement network segmentation strategies, use VLANs (Virtual Local Area Networks), and enforce access controls between segments." },
  { title: "Lack of Encryption", description: "Use encryption for all sensitive data, including data at rest, in transit, and during processing, and ensure encryption protocols are up-to-date." }
];

const Safety = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-8">
      <h1 className="text-4xl font-extrabold text-center text-white mb-10 drop-shadow-lg animate-pulse">
        Cybersecurity Safety Measures
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {safetyMeasures.map((measure, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-2xl rounded-xl p-6 flex flex-col items-center transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-blue-500/50"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.div
              className="text-blue-500 text-5xl mb-3"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <FaShieldAlt />
            </motion.div>
            <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">
              {measure.title}
            </h2>
            <p className="text-gray-600 text-center">
              {measure.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Safety;