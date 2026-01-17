import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../../../components/ui/SectionHeader';

const AboutUsTeam = ({ settings, isRTL, getImageUrl }) => {
  const sectionTitle = isRTL ? settings?.teamSectionTitleAr : settings?.teamSectionTitleEn;
  const sectionSubtitle = isRTL ? settings?.teamSectionSubtitleAr : settings?.teamSectionSubtitleEn;
  const teamMembers = settings?.teamMembers || [];

  if (!sectionTitle || teamMembers.length === 0) {
    return null;
  }

  // Build hierarchy from flat array
  const buildHierarchy = members => {
    const membersMap = new Map();
    const rootMembers = [];

    // First pass: create map
    members.forEach(member => {
      membersMap.set(member.id, { ...member, children: [] });
    });

    // Second pass: build tree
    members.forEach(member => {
      const memberNode = membersMap.get(member.id);
      if (member.parentId) {
        const parent = membersMap.get(member.parentId);
        if (parent) {
          parent.children.push(memberNode);
        } else {
          // Parent not found, treat as root
          rootMembers.push(memberNode);
        }
      } else {
        rootMembers.push(memberNode);
      }
    });

    return rootMembers;
  };

  const hierarchicalMembers = buildHierarchy(teamMembers);

  const TeamMemberCard = ({ member, level = 0 }) => {
    const name = isRTL ? member.nameAr : member.nameEn;
    const jobTitle = isRTL ? member.jobTitleAr : member.jobTitleEn;
    const imageSrc = member.imageUrl ? getImageUrl(member.imageUrl) : null;

    return (
      <div className="flex flex-col items-center">
        <motion.div
          className="relative group cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Image Card */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[var(--color-card)] shadow-lg transition-transform group-hover:scale-105">
            {imageSrc ? (
              <img src={imageSrc} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[var(--color-border)] flex items-center justify-center">
                <span className="text-[var(--color-text-muted)] text-2xl font-bold">{name.charAt(0)}</span>
              </div>
            )}
          </div>

          {/* Hover Overlay with Name and Job Title */}
          <div className="absolute inset-0 bg-[var(--color-bg)]/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-2 border-4 border-[var(--color-card)]">
            <p className={`text-[var(--color-text)] font-bold text-sm md:text-base text-center ${isRTL ? 'text-right' : 'text-left'}`}>{name}</p>
            <p className={`text-[var(--color-text-muted)] text-xs md:text-sm text-center mt-1 ${isRTL ? 'text-right' : 'text-left'}`}>{jobTitle}</p>
          </div>
        </motion.div>

        {/* Children (subordinates) */}
        {member.children && member.children.length > 0 && (
          <div className={`mt-8 flex flex-wrap justify-center gap-4 md:gap-6 ${level > 0 ? 'pl-4 md:pl-8' : ''}`}>
            {member.children.map(child => (
              <TeamMemberCard key={child.id} member={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="w-full py-16 md:py-24 bg-[var(--color-card)]" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header Section */}
        <SectionHeader title={sectionTitle} subtitle={sectionSubtitle} align="center" color="text-[var(--color-text)]" subTitleColor="text-[var(--color-text-muted)]" />

        {/* Team Members Hierarchy */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {hierarchicalMembers.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} level={0} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsTeam;
