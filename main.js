/* ==========================================================================
   TECHNOSOFT MASTERS INC. - Official Website Script
   Theme: Futuristic IT Network Cyber Navy
   Features:
   - Sticky Header & Smooth Navigation
   - Scroll Reveal Animations
   - Ambient Mouse Spotlight
   - Interactive 3D Tilt Micro-Interactions
   - Contact Form Pre-fill & Dispatch
   - Multi-Level Deep Drill-Down Explorer (Level 1 -> Level 2 -> Level 3 Sub-Files)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- Sticky Navigation & Active Link Highlight ---
  const header = document.getElementById('site-header');
  const navMenu = document.getElementById('nav-menu');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Header Background Blur on Scroll
    if (scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active Nav Item on Scroll
    let currentSectionId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // --- Mobile Drawer Menu Toggle ---
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking outside or on a link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Smooth Anchor Scrolling with Header Offset ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  // --- Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  // --- Ambient Dynamic Cursor Spotlight Follower ---
  const spotlight = document.createElement('div');
  spotlight.id = 'cursor-spotlight';
  document.body.appendChild(spotlight);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;
  let isMoving = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isMoving) {
      spotlight.style.opacity = '1';
      isMoving = true;
    }
  });

  window.addEventListener('mouseleave', () => {
    spotlight.style.opacity = '0';
    isMoving = false;
  });

  function renderSpotlight() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    spotlight.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    requestAnimationFrame(renderSpotlight);
  }
  renderSpotlight();

  // --- 3D Tilt Micro-Interaction for Glass Cards ---
  const interactiveCards = document.querySelectorAll('.glass-card, .service-card, .why-card, .solution-card');
  interactiveCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;
      card.style.transform = `perspective(1000px) translateY(-6px) rotateX(${-deltaY * 3.5}deg) rotateY(${deltaX * 3.5}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // --- Contact Form Submission & Email Dispatch ---
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const phone = document.getElementById('form-phone').value.trim();
      const company = document.getElementById('form-company').value.trim();
      const service = document.getElementById('form-service').value;
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !service || !message) {
        showFormMessage('Please fill in all required fields (Name, Email, Service, and Message).', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid business email address.', 'error');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 1s linear infinite; margin-right: 8px;"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke-opacity="1"></path></svg>
        <span>Processing Request...</span>
      `;

      setTimeout(() => {
        const recipient = 'Info@technosoftmasters.com';
        const subject = encodeURIComponent(`[Inquiry] ${service} - from ${name} (${company || 'Direct'})`);
        const body = encodeURIComponent(
          `Technosoft Masters Inc. - Client Inquiry\n` +
          `----------------------------------------\n` +
          `Full Name: ${name}\n` +
          `Email: ${email}\n` +
          `Phone: ${phone || 'Not Provided'}\n` +
          `Company: ${company || 'Not Provided'}\n` +
          `Service Requested: ${service}\n\n` +
          `Project Details & Scope:\n${message}\n\n` +
          `Submitted via technosoftmasters.com web portal`
        );

        const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        window.location.href = mailtoUrl;

        showFormMessage(
          `Your inquiry is prepared for <strong>${recipient}</strong>. If your email software did not open automatically, <a href="${mailtoUrl}" target="_blank" rel="noopener">click here to send email</a> or reach us directly at <a href="mailto:${recipient}">${recipient}</a>.`,
          'success'
        );

        contactForm.reset();
      }, 600);
    });

    function showFormMessage(message, type) {
      formStatus.className = `form-status-message ${type}`;
      formStatus.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:2px;">
          ${
            type === 'success'
              ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>'
              : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'
          }
        </svg>
        <div>${message}</div>
      `;
      formStatus.style.display = 'flex';
    }
  }

  // =========================================================================
  // MULTI-LEVEL DEEP DRILL-DOWN EXPLORER DATABASE & ENGINE
  // =========================================================================
  const modalDatabase = {
  "microsoft": {
    "badge": "Authorized Strategic Alliance",
    "title": "Microsoft Enterprise Cloud & Infrastructure Solutions",
    "serviceKey": "Cloud Solutions",
    "overview": "As an authorized Microsoft ecosystem partner, Technosoft Masters Inc. designs, migrates, and orchestrates enterprise-grade cloud environments, productivity platforms, and zero-trust identity architectures tailored for scale, security, and Canadian regulatory compliance.",
    "techStack": [
      "Microsoft Azure",
      "Microsoft 365",
      "Entra ID (Azure AD)",
      "Windows Server 2025",
      "Hyper-V Clustering",
      "Microsoft Intune",
      "SharePoint Online",
      "Azure Arc"
    ],
    "subFiles": [
      {
        "id": "azure-cloud",
        "title": "Microsoft Azure Hybrid Cloud Architecture",
        "category": "Cloud Computing & Compute",
        "summary": "High-availability Azure VMs, scalable Azure SQL databases, serverless functions, and secure virtual network (VNet) peering with on-premise datacenter interconnects.",
        "specs": [
          "Multi-region geo-redundant virtual machine scale sets (VMSS) with 99.99% uptime SLAs.",
          "High-performance Azure SQL Managed Instances with automated geo-replication and point-in-time restore.",
          "Secure ExpressRoute & Site-to-Site IPsec VPN tunnels bridging local infrastructure to Azure VNets.",
          "Azure Cost Management & Reserved Instance (RI) optimization yielding up to 45% annual cloud savings."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Workload & TCO Assessment",
            "desc": "Audit on-premise compute usage, IOPS, RAM, and bandwidth requirements to establish exact Azure VM sizing and migration cost projections."
          },
          {
            "phase": "Phase 2: Hybrid Landing Zone Setup",
            "desc": "Provision Azure Resource Groups, Virtual Networks, Subnet NSGs, Key Vaults, and ExpressRoute / IPsec gateways."
          },
          {
            "phase": "Phase 3: Zero-Downtime Data Migration",
            "desc": "Execute live database synchronization and VM block replication via Azure Migrate with zero daytime operational interruption."
          },
          {
            "phase": "Phase 4: 24/7 Telemetry & Health Checks",
            "desc": "Activate Azure Monitor, Log Analytics workspace alerts, automated auto-scaling rules, and quarterly cost-optimization audits."
          }
        ],
        "configPreview": {
          "type": "PowerShell / Azure CLI",
          "code": "# Deploy High-Availability Enterprise Azure Landing Zone\n$ResourceGroup = \"TM-Enterprise-Prod-RG\"\n$Location = \"canadacentral\"\n\nNew-AzResourceGroup -Name $ResourceGroup -Location $Location\n$VNet = New-AzVirtualNetwork -ResourceGroupName $ResourceGroup -Name \"TM-Core-VNet\" -AddressPrefix \"10.240.0.0/16\"\nAdd-AzVirtualNetworkSubnetConfig -Name \"Compute-Subnet\" -AddressPrefix \"10.240.1.0/24\" -VirtualNetwork $VNet\n$VNet | Set-AzVirtualNetwork"
        },
        "compliance": [
          "PIPEDA Canadian Data Residency",
          "SOC 2 Type II",
          "ISO 27001",
          "HIPAA"
        ]
      },
      {
        "id": "m365-enterprise",
        "title": "Microsoft 365 Enterprise Ecosystem & Collaboration",
        "category": "Workplace Productivity",
        "summary": "Comprehensive deployment of Exchange Online, SharePoint Online corporate intranets, Teams voice/collaboration governance, and OneDrive enterprise synchronization.",
        "specs": [
          "Zero-data-loss email migration from legacy IMAP/Exchange to Exchange Online with unlimited archive retention.",
          "Custom SharePoint Online document libraries with automated metadata tagging and retention labels.",
          "Enterprise Microsoft Teams governance including secure guest access, DLP inspection, and policy packages.",
          "Exchange Online Protection (EOP) and Microsoft Defender for Office 365 anti-phishing safeguards."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Mailbox & Tenant Discovery",
            "desc": "Analyze existing mail sizes, distribution lists, shared mailboxes, and MX record DNS propagation parameters."
          },
          {
            "phase": "Phase 2: Staged Cloud Migration",
            "desc": "Establish hybrid Exchange routing and synchronize initial mailboxes in batches to eliminate user disruption."
          },
          {
            "phase": "Phase 3: Domain & DNS Cutover",
            "desc": "Switch MX, SPF, DKIM, and DMARC security records during scheduled off-hours maintenance."
          },
          {
            "phase": "Phase 4: User Onboarding & Support",
            "desc": "Automated Outlook/Teams profile provisioning, mobile device setup, and end-user productivity tutorials."
          }
        ],
        "configPreview": {
          "type": "PowerShell / Exchange Online",
          "code": "# Enforce Enterprise Security & Anti-Phishing Baseline\nConnect-ExchangeOnline -UserPrincipalName admin@technosoftmasters.com\nSet-MailboxPlan -Identity \"ExchangeOnlineEnterprise\" -AuditEnabled $true\nSet-MalwareFilterPolicy -Identity \"Default\" -EnableInternalMessagesFilter $true -Action DeleteMessage"
        },
        "compliance": [
          "TLS 1.3 Encryption",
          "Canadian Privacy Laws",
          "GDPR",
          "Anti-Spam CASL"
        ]
      },
      {
        "id": "entra-id-iam",
        "title": "Microsoft Entra ID (Azure AD) & Zero-Trust IAM",
        "category": "Identity & Access Governance",
        "summary": "Zero-trust identity management, Multi-Factor Authentication (MFA), Conditional Access policies, role-based access control (RBAC), and Single Sign-On (SSO).",
        "specs": [
          "Conditional Access policies enforcing MFA based on IP geolocation, device health posture, and risk level.",
          "Single Sign-On (SSO) integration across 100+ cloud SaaS applications using SAML 2.0 and OpenID Connect.",
          "Privileged Identity Management (PIM) providing time-bound, approval-required just-in-time administrative access.",
          "Self-Service Password Reset (SSPR) with automated on-premise Active Directory writeback."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Identity & Role Audit",
            "desc": "Map corporate org charts, administrative privilege tiers, and active user directories."
          },
          {
            "phase": "Phase 2: Hybrid Directory Sync",
            "desc": "Deploy Microsoft Entra Connect with password hash synchronization and seamless SSO."
          },
          {
            "phase": "Phase 3: Conditional Access Enactment",
            "desc": "Enforce biometric MFA, compliant device requirements, and block legacy basic authentication protocols."
          },
          {
            "phase": "Phase 4: Risk Analytics & PIM",
            "desc": "Enable real-time identity protection alerts for impossible travel and leaked credential detection."
          }
        ],
        "configPreview": {
          "type": "JSON Policy Rule",
          "code": "{\n  \"displayName\": \"Enforce-MFA-All-Corporate-Users\",\n  \"state\": \"enabled\",\n  \"conditions\": {\n    \"users\": { \"includeUsers\": [\"All\"] },\n    \"applications\": { \"includeApplications\": [\"All\"] },\n    \"clientAppTypes\": [\"browser\", \"mobileAppsAndDesktopClients\"]\n  },\n  \"grantControls\": { \"operator\": \"OR\", \"builtInControls\": [\"mfa\", \"compliantDevice\"] }\n}"
        },
        "compliance": [
          "NIST 800-63B",
          "Zero-Trust Framework",
          "SOC 2 Type II",
          "PIPEDA"
        ]
      },
      {
        "id": "intune-endpoints",
        "title": "Microsoft Intune Cloud Endpoint & Fleet Management",
        "category": "Device & Fleet Governance",
        "summary": "Cloud-based Unified Endpoint Management (UEM), automated software distribution, security baselines, and zero-touch Windows Autopilot provisioning for corporate fleets.",
        "specs": [
          "Zero-touch Windows Autopilot deployment: shipped devices configure automatically upon first employee login.",
          "Automated BitLocker disk encryption with centralized cloud recovery key escrow.",
          "Unified policy management across Windows 11, macOS, iOS, and Android mobile devices.",
          "Remote device wipe, corporate data isolation (MAM), and automated operating system patch rings."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Fleet Inventory Mapping",
            "desc": "Catalog corporate hardware models, OEM serial numbers, and required departmental application suites."
          },
          {
            "phase": "Phase 2: Compliance Profile Staging",
            "desc": "Build BitLocker, firewall, password complexity, and antivirus compliance profiles in Microsoft Intune."
          },
          {
            "phase": "Phase 3: Zero-Touch Autopilot Setup",
            "desc": "Register device hardware hashes with Microsoft Partner Center for instant out-of-the-box cloud enrollment."
          },
          {
            "phase": "Phase 4: Automated Patch Rings",
            "desc": "Configure Quality and Feature update rings ensuring zero security vulnerabilities across corporate laptops."
          }
        ],
        "configPreview": {
          "type": "PowerShell Intune Graph",
          "code": "# Verify Enterprise Fleet Encryption & Security Baseline\n$Devices = Get-IntuneManagedDevice | Select-Object deviceName, operatingSystem, complianceState\n$Devices | Where-Object { $_.complianceState -ne \"compliant\" } | ForEach-Object {\n    Invoke-IntuneDeviceSync -DeviceId $_.id\n}"
        },
        "compliance": [
          "CIS Benchmarks",
          "ISO 27001",
          "SOC 2",
          "PIPEDA"
        ]
      },
      {
        "id": "windows-server-hyperv",
        "title": "Windows Server 2025 & Hyper-V Virtualization",
        "category": "On-Premise Infrastructure",
        "summary": "Failover clustering, Active Directory Domain Services (AD DS), Group Policy automation, Storage Spaces Direct (S2D), and seamless Azure Arc hybrid management.",
        "specs": [
          "Hyper-V Failover Clustering with automated virtual machine live migration and zero downtime.",
          "Active Directory Domain Services (AD DS) multi-master replication with automated forest backup.",
          "Storage Spaces Direct (S2D) software-defined SAN storage delivering millions of IOPS.",
          "Azure Arc agent integration enabling centralized cloud management for physical on-premise servers."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Hardware & Compute Sizing",
            "desc": "Calculate CPU cores, ECC RAM allocations, RAID controller parameters, and redundant NIC teaming."
          },
          {
            "phase": "Phase 2: Hyper-V Cluster Provisioning",
            "desc": "Install Windows Server Datacenter, configure Hyper-V virtual switches, and enable Cluster Shared Volumes."
          },
          {
            "phase": "Phase 3: VM Migration & Active Directory",
            "desc": "Migrate domain controllers, file servers, and application VMs into high-availability clustered storage."
          },
          {
            "phase": "Phase 4: DR Replicas & Arc Integration",
            "desc": "Establish off-site Hyper-V replica replication schedules and integrate with Azure Arc for unified monitoring."
          }
        ],
        "configPreview": {
          "type": "PowerShell Script",
          "code": "# Deploy High-Availability Hyper-V VM with Live Migration\nNew-VM -Name \"TM-APP-SRV01\" -MemoryStartupBytes 32GB -Generation 2 -NewVHDPath \"C:\\ClusterStorage\\Volume1\\TM-APP.vhdx\" -NewVHDSizeBytes 500GB\nSet-VMProcessor -VMName \"TM-APP-SRV01\" -Count 8\nAdd-ClusterVirtualMachineRole -VMName \"TM-APP-SRV01\""
        },
        "compliance": [
          "High Availability 99.99%",
          "Enterprise SLA",
          "Disaster Recovery Tested"
        ]
      },
      {
        "id": "csp-licensing-finops",
        "title": "Enterprise Cloud Solution Provider (CSP) & FinOps",
        "category": "Licensing & Financial Governance",
        "summary": "Cloud Solution Provider (CSP) licensing optimization, Microsoft Azure reserved instance planning, and automated cost monitoring to eliminate wasted expenditure.",
        "specs": [
          "Direct CSP tier licensing for Microsoft 365 E3/E5, Business Premium, and Azure consumption.",
          "Continuous license reclamation auditing to eliminate inactive or unassigned user seats.",
          "1-year and 3-year Azure Reserved Instance (RI) and Azure Savings Plan financial modeling.",
          "Consolidated monthly invoicing with granular cost-center chargeback reporting."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: License Audit & Clean-up",
            "desc": "Inspect current Microsoft tenant for over-provisioned or duplicate licenses."
          },
          {
            "phase": "Phase 2: CSP Transition",
            "desc": "Migrate licenses to Technosoft Masters CSP tier with zero downtime and preferred volume pricing."
          },
          {
            "phase": "Phase 3: Azure Workload Right-Sizing",
            "desc": "Analyze 30-day CPU/RAM utilization metrics to downsize under-utilized cloud instances."
          },
          {
            "phase": "Phase 4: Ongoing FinOps Reviews",
            "desc": "Deliver monthly cost optimization executive summaries and budget threshold alerts."
          }
        ],
        "configPreview": {
          "type": "FinOps Telemetry Schema",
          "code": "{\n  \"auditScope\": \"Microsoft CSP Enterprise\",\n  \"targetSavingsTarget\": \"35%\",\n  \"optimizationStrategies\": [\"Azure Reserved Instances\", \"Hybrid Benefit Licensing\", \"Automated Off-Hours VM Deallocation\"],\n  \"status\": \"Active Governance\"\n}"
        },
        "compliance": [
          "Canadian Tax Compliant",
          "Audit Ready",
          "Cost Controlled"
        ]
      }
    ]
  },
  "sonicwall": {
    "badge": "Authorized Security Partner",
    "title": "SonicWall Next-Generation Firewalls & Threat Defense",
    "serviceKey": "Cybersecurity Services",
    "overview": "Delivering enterprise perimeter protection, zero-day threat defense, deep packet inspection, and resilient SD-WAN architectures powered by SonicWall Next-Generation Firewalls (NGFW).",
    "techStack": [
      "SonicWall NSa Series",
      "SonicWall TZ Series",
      "Capture ATP",
      "RTDMI Engine",
      "DPI-SSL/TLS",
      "Secure SD-WAN",
      "Zero-Trust Network Access",
      "Cloud App Security"
    ],
    "subFiles": [
      {
        "id": "sonicwall-ngfw",
        "title": "SonicWall Next-Gen Firewalls (NSa & TZ Series)",
        "category": "Perimeter & Network Security",
        "summary": "Multi-gigabit Deep Packet Inspection (DPI-SSL/TLS), Intrusion Prevention Systems (IPS), application control, and real-time perimeter threat blocking.",
        "specs": [
          "Real-time DPI-SSL inspection for encrypted HTTPS traffic without network bottlenecking.",
          "Hardware-accelerated Intrusion Prevention System (IPS) with hourly threat signature updates.",
          "Application Intelligence & Control providing granular bandwidth limits on non-business web apps.",
          "High-Availability (Active/Standby) firewall clustering with sub-second failover."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Perimeter Traffic Assessment",
            "desc": "Analyze WAN throughput, concurrent connection limits, and internal subnet segmentation needs."
          },
          {
            "phase": "Phase 2: Staged Rule Configuration",
            "desc": "Build address objects, access rules, NAT policies, and security services in SonicOS."
          },
          {
            "phase": "Phase 3: Production Gateway Cutover",
            "desc": "Install physical SonicWall appliance with zero-downtime dual-WAN failover testing."
          },
          {
            "phase": "Phase 4: 24/7 Threat Telemetry",
            "desc": "Connect firewall logs to centralized SIEM and automated anomaly alert systems."
          }
        ],
        "configPreview": {
          "type": "SonicOS CLI Command",
          "code": "# SonicOS Enterprise Security Profile Baseline\nsecurity-services\n  intrusion-prevention enable\n  gateway-antivirus enable\n  anti-spyware enable\n  cloud-av enable\n  capture-atp enable\nexit"
        },
        "compliance": [
          "ICSA Labs Certified",
          "FIPS 140-2",
          "PCI-DSS Compliant",
          "SOC 2"
        ]
      },
      {
        "id": "sonicwall-capture-atp",
        "title": "Capture ATP with Real-Time Deep Memory Inspection (RTDMI)",
        "category": "Zero-Day Threat Protection",
        "summary": "Multi-engine cloud sandboxing powered by patent-pending Real-Time Deep Memory Inspection (RTDMI) to block evasive zero-day malware and ransomware before download.",
        "specs": [
          "Real-time memory inspection catching zero-day threats that evade traditional hypervisor sandboxes.",
          "Block-Until-Verdict technology ensuring suspicious files are held until safely analyzed.",
          "Automated behavioral analysis across Windows, macOS, Android, and 300+ file extensions.",
          "Global Threat Intelligence Network sharing threat telemetry from 1M+ active sensors worldwide."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Gateway Inspection Policy",
            "desc": "Activate Capture ATP cloud sandbox integration on gateway interfaces."
          },
          {
            "phase": "Phase 2: File Extension Profiling",
            "desc": "Define strict inspect-and-hold rules for executables, archives, and Office macros."
          },
          {
            "phase": "Phase 3: Sandbox Verification",
            "desc": "Test sandbox detonation with safe simulated malware payloads to verify sub-second blocking."
          },
          {
            "phase": "Phase 4: Threat Reporting",
            "desc": "Deliver executive threat mitigation digests detailing blocked malicious vectors."
          }
        ],
        "configPreview": {
          "type": "SonicOS ATP Policy",
          "code": "# Configure Capture ATP Block-Until-Verdict\ncapture-atp\n  enable\n  block-until-verdict enable\n  cloud-service global-best-latency\n  file-types include-all-executables-and-documents\nexit"
        },
        "compliance": [
          "Zero-Day SLA",
          "Anti-Ransomware Shield",
          "NIST CSF"
        ]
      },
      {
        "id": "sonicwall-sd-wan",
        "title": "Secure SD-WAN & Site-to-Site Encrypted Mesh",
        "category": "Branch Networking & Telephony",
        "summary": "Dynamic path selection, sub-second WAN failover, and high-performance IPsec encrypted VPN tunnels connecting corporate branches, retail stores, and remote staff.",
        "specs": [
          "Dynamic SLA-based path selection monitoring latency, jitter, and packet loss in real time.",
          "Sub-second automated dual-WAN failover maintaining uninterrupted VoIP and video calls.",
          "AES-256 encrypted site-to-site VPN mesh connecting remote branch offices securely.",
          "Seamless broadband, fiber, and 5G cellular failover integration."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: WAN Topology Design",
            "desc": "Determine primary fiber, secondary broadband, and LTE/5G emergency circuits."
          },
          {
            "phase": "Phase 2: Dynamic SD-WAN SLA Rules",
            "desc": "Configure latency thresholds (<30ms) for VoIP and mission-critical cloud traffic."
          },
          {
            "phase": "Phase 3: IPsec Mesh Deployment",
            "desc": "Establish automated site-to-site mesh tunnels between headquarters and branches."
          },
          {
            "phase": "Phase 4: Failover Simulation",
            "desc": "Perform physical cable pull tests to verify seamless live circuit switching without dropped calls."
          }
        ],
        "configPreview": {
          "type": "SonicOS SD-WAN Rule",
          "code": "# Deploy Dynamic Secure SD-WAN Path Selection\nsd-wan\n  sla-class \"VoIP-Priority\" latency 30 jitter 10 packet-loss 1\n  path-selection \"WAN-Primary\" fallback \"WAN-Secondary\"\nexit"
        },
        "compliance": [
          "99.999% Branch Uptime",
          "FIPS 140-3",
          "PCI-DSS Network"
        ]
      },
      {
        "id": "sonicwall-ztna",
        "title": "Zero-Trust Network Access (ZTNA) & SMA Gateways",
        "category": "Remote Access Security",
        "summary": "Secure Mobile Access (SMA) gateways providing granular per-application remote access, biometric MFA, and endpoint compliance verification for remote staff.",
        "specs": [
          "Clientless HTML5 browser access to internal corporate web apps, RDP desktops, and file shares.",
          "Continuous endpoint posture checking (antivirus status, OS patch level, domain membership).",
          "Granular per-application micro-segmentation preventing lateral network movement.",
          "Single sign-on (SSO) integration with Microsoft Entra ID and Google Workspace."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Remote Access Mapping",
            "desc": "Catalog remote workforce applications, RDP endpoints, and security clearance levels."
          },
          {
            "phase": "Phase 2: SMA Gateway Setup",
            "desc": "Deploy physical or virtual SMA appliance with TLS 1.3 encrypted portal."
          },
          {
            "phase": "Phase 3: Device Posture Enactment",
            "desc": "Require corporate endpoint verification before granting internal network access."
          },
          {
            "phase": "Phase 4: Audit & Log Aggregation",
            "desc": "Monitor active user sessions and automatically terminate anomalous access attempts."
          }
        ],
        "configPreview": {
          "type": "ZTNA Policy Profile",
          "code": "{\n  \"gateway\": \"SMA-ZeroTrust-Primary\",\n  \"accessPolicy\": \"Per-App-Least-Privilege\",\n  \"deviceVerification\": { \"bitlocker\": true, \"edrRunning\": true, \"osVersion\": \">=Windows 11\" },\n  \"sessionTimeout\": 28800\n}"
        },
        "compliance": [
          "Zero-Trust Architecture",
          "CISA ZTMM",
          "HIPAA Remote"
        ]
      },
      {
        "id": "sonicwall-cloud-app-security",
        "title": "SonicWall Cloud App Security (CAS) & SaaS Defense",
        "category": "Cloud Application Security",
        "summary": "API-based security and DLP protection for Microsoft 365, Google Workspace, and enterprise SaaS cloud tools against credential theft, malicious file sharing, and phishing.",
        "specs": [
          "API-driven inline scanning for incoming, outgoing, and internal Microsoft 365 emails.",
          "Cloud Data Loss Prevention (DLP) detecting sensitive credit cards, SIN numbers, and confidential files.",
          "Shadow IT discovery identifying unauthorized SaaS tools used across corporate devices.",
          "Automated account takeover protection detecting suspicious login geolocations."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Cloud Tenant API Connection",
            "desc": "Grant secure OAuth2 API permissions to Microsoft 365 or Google Workspace tenant."
          },
          {
            "phase": "Phase 2: DLP Policy Definition",
            "desc": "Configure compliance filters for financial data, personal health information, and trade secrets."
          },
          {
            "phase": "Phase 3: Shadow IT Scan",
            "desc": "Identify unmanaged cloud storage and unauthorized web applications."
          },
          {
            "phase": "Phase 4: Automated Incident Response",
            "desc": "Set automated rules to quarantine phishing emails and revoke compromised user tokens."
          }
        ],
        "configPreview": {
          "type": "CAS Policy Engine",
          "code": "# Enforce Cloud SaaS DLP & Quarantine\ncloud-app-security\n  target \"Microsoft 365 Tenant\"\n  dlp-policy \"Block-Sensitive-SIN-and-Financial\" action quarantine\n  anti-phishing sensitivity high\nexit"
        },
        "compliance": [
          "PIPEDA",
          "SOC 2 Type II",
          "GDPR Cloud"
        ]
      }
    ]
  },
  "unifi": {
    "badge": "Enterprise Wireless & Switching",
    "title": "Ubiquiti UniFi Enterprise Network Infrastructure",
    "serviceKey": "Network Operations Services",
    "overview": "End-to-end design, installation, and multi-site cloud management for Ubiquiti UniFi ecosystems\u2014delivering seamless enterprise WiFi 6/7, high-density PoE+ switching, and centralized console governance.",
    "techStack": [
      "UniFi WiFi 7",
      "UniFi UDM-Pro / SE",
      "Enterprise PoE+ Switches",
      "UniFi OS",
      "VLAN Segmentation",
      "Site-to-Site WireGuard",
      "Captive Portals",
      "24/7 Cloud NOC"
    ],
    "subFiles": [
      {
        "id": "unifi-wifi-7",
        "title": "UniFi WiFi 6 & WiFi 7 Enterprise Access Points",
        "category": "High-Density Wireless",
        "summary": "Deployment of U6-Enterprise and U7-Pro access points with high-density RF channel mapping, 6GHz band support, beamforming, and seamless fast roaming (802.11r/k/v).",
        "specs": [
          "Tri-band WiFi 7 with 6GHz spectrum delivering multi-gigabit wireless throughput.",
          "Seamless 802.11r/k/v fast BSS transition for zero-drop VoIP and video roaming across buildings.",
          "Automated RF channel optimization and AI interference avoidance.",
          "High client density supporting 500+ concurrent devices per access point."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Predictive RF Heatmap Survey",
            "desc": "Map building floor plans, wall attenuation materials, and client density zones."
          },
          {
            "phase": "Phase 2: Structured AP Placement",
            "desc": "Mount enterprise access points with Cat6A shielded drops and PoE+ power budgeting."
          },
          {
            "phase": "Phase 3: Frequency Tuning & Roaming",
            "desc": "Configure non-overlapping 20/40/80/160MHz channels and minimum RSSI thresholds."
          },
          {
            "phase": "Phase 4: Live Client Stress Test",
            "desc": "Walk building perimeter with spectrum analyzers to verify seamless roaming handoffs."
          }
        ],
        "configPreview": {
          "type": "UniFi Controller Config",
          "code": "# Enterprise WiFi 7 SSID Profile\nwlan_profile {\n  name = \"TM-Corp-WiFi7\"\n  security = \"WPA3-Enterprise\"\n  bands = [\"2.4GHz\", \"5GHz\", \"6GHz\"]\n  fast_roaming = true\n  band_steering = \"prefer_5g_6g\"\n}"
        },
        "compliance": [
          "Wi-Fi Alliance Certified",
          "WPA3 Enterprise",
          "Enterprise QoS"
        ]
      },
      {
        "id": "unifi-udm-gateways",
        "title": "UniFi Dream Machines (UDM Pro / SE) & 10G Routing",
        "category": "Enterprise Routing & Gateway",
        "summary": "10G SFP+ WAN routing, integrated intrusion prevention (IPS/IDS), automated dual-WAN failover, and high-speed UniFi OS console.",
        "specs": [
          "3.5+ Gbps routing throughput with full DPI and IPS/IDS security active.",
          "Dual-WAN failover and load balancing supporting multi-gigabit fiber connections.",
          "Integrated UniFi OS hosting Network, Protect, Access, and Talk applications.",
          "Hardware redundant power supply (UniFi SmartPower RPS) support."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: ISP Circuit Integration",
            "desc": "Configure static IP allocations, SFP+ 10G transceivers, and primary/secondary WANs."
          },
          {
            "phase": "Phase 2: Subnet & VLAN Mapping",
            "desc": "Build separate networks for Management, Corporate, VoIP, CCTV, and Guest traffic."
          },
          {
            "phase": "Phase 3: Security & Firewall Rules",
            "desc": "Enable Category 5 IPS/IDS inspection and inter-VLAN blocking rules."
          },
          {
            "phase": "Phase 4: Cloud Console Link",
            "desc": "Connect gateway to Technosoft Masters multi-tenant 24/7 cloud monitoring."
          }
        ],
        "configPreview": {
          "type": "UniFi Gateway Policy",
          "code": "# Configure 10G SFP+ Dual-WAN Failover\nwan_settings {\n  port_9 = \"10G SFP+ Primary Bell Fiber\"\n  port_10 = \"2.5G RJ45 Secondary Rogers Cable\"\n  mode = \"failover_only\"\n  ping_target = \"1.1.1.1\"\n  failover_delay_seconds = 2\n}"
        },
        "compliance": [
          "10G Ready",
          "Enterprise IPS/IDS",
          "99.99% Routing SLA"
        ]
      },
      {
        "id": "unifi-poe-switches",
        "title": "UniFi Managed PoE+ & Pro/Enterprise Switch Fabrics",
        "category": "Switching Infrastructure",
        "summary": "Multi-gigabit 2.5G/10G switches, Layer 3 routing, VLAN segmentation, and PoE power budget optimization for VoIP phones, APs, and security cameras.",
        "specs": [
          "Layer 3 switching features: inter-VLAN routing, static routing, and DHCP server relay.",
          "PoE++ (802.3bt) delivering up to 60W per port for high-draw PTZ cameras and WiFi 7 APs.",
          "10G/25G SFP28 optical uplink aggregation between distribution and core racks.",
          "Per-port bandwidth limiting, 802.1X radius authentication, and loop prevention (STP/RSTP)."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Port Density & Wattage Audit",
            "desc": "Calculate total PoE wattage requirements and port counts across all building IDF closets."
          },
          {
            "phase": "Phase 2: Rack Mounting & Fiber Links",
            "desc": "Install switches in 42U racks with clean color-coded slim patch cables."
          },
          {
            "phase": "Phase 3: Port Profile Assignment",
            "desc": "Tag specific VLANs to corporate desks, access points, and surveillance cameras."
          },
          {
            "phase": "Phase 4: Loop & Spanning Tree Verification",
            "desc": "Verify RSTP root bridge priority to prevent network broadcast storms."
          }
        ],
        "configPreview": {
          "type": "UniFi Switch Port Profile",
          "code": "# Enterprise PoE+ Port Profile Config\nport_profile {\n  name = \"AP-Trunk-Profile\"\n  native_network = \"Management-VLAN-10\"\n  tagged_networks = [\"Corporate-20\", \"VoIP-30\", \"Guest-40\"]\n  poe_mode = \"auto_poe_plus\"\n  stp_state = \"enabled\"\n}"
        },
        "compliance": [
          "IEEE 802.3bt PoE++",
          "Energy Efficient Ethernet",
          "Layer 3 Wire-Speed"
        ]
      }
    ]
  },
  "modern-it": {
    "badge": "Enterprise Architecture & Cloud Systems",
    "title": "Modern IT Architecture & High-Availability Infrastructure",
    "serviceKey": "IT Solutions",
    "overview": "Technosoft Masters Inc. designs and deploys next-generation modern IT architectures that unify cloud ecosystems, on-premise compute infrastructure, zero-trust cybersecurity, and automated data pipelines for maximum enterprise scalability, reliability, and security.",
    "techStack": [
      "Hybrid Cloud",
      "Microsoft Azure / AWS",
      "Hyper-V / VMware Clusters",
      "10G/40G Fiber Fabrics",
      "Zero-Trust IAM",
      "Microsoft Intune",
      "Disaster Recovery (BCDR)",
      "24/7 Telemetry"
    ],
    "subFiles": [
      {
        "id": "hybrid-compute",
        "title": "Hybrid Cloud & Multi-Tier Compute Infrastructure",
        "category": "Compute & Infrastructure",
        "summary": "High-availability virtualized server clusters, cloud-native microservices, automated load balancing, and sub-millisecond network peering.",
        "specs": [
          "Active-Active clustered virtualization environments with automated instant failover.",
          "Microservices containerization using Docker and Kubernetes orchestration.",
          "Sub-millisecond hybrid cloud interconnects bridging on-premise hardware to Azure/AWS.",
          "Automated compute resource re-balancing during peak business operational hours."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Compute & IOPS Profiling",
            "desc": "Evaluate CPU workload peaks, RAM saturation, and disk read/write throughput."
          },
          {
            "phase": "Phase 2: Redundant Cluster Deployment",
            "desc": "Build clustered server nodes with dual-path redundant power and network teaming."
          },
          {
            "phase": "Phase 3: Workload Containerization",
            "desc": "Migrate monolithic legacy applications into decoupled, resilient container services."
          },
          {
            "phase": "Phase 4: Automated Failover Drills",
            "desc": "Simulate node hardware crashes to guarantee continuous zero-drop application availability."
          }
        ],
        "configPreview": {
          "type": "Architecture Cluster Config",
          "code": "# High-Availability Compute Cluster Specification\ncluster_definition:\n  nodes: 4\n  cpu_cores: 128\n  memory_total: 1024GB\n  storage_tier: \"NVMe All-Flash S2D\"\n  failover_policy: \"Automated-Zero-Downtime\"\n  hybrid_cloud_peer: \"Azure-Canada-Central\""
        },
        "compliance": [
          "99.999% SLA",
          "Fault-Tolerant Design",
          "Enterprise Scalability"
        ]
      },
      {
        "id": "bcdr-disaster-recovery",
        "title": "Disaster Recovery & Business Continuity (BCDR)",
        "category": "Resilience & Recovery",
        "summary": "Automated off-site replication, immutable ransomware-proof cloud snapshots, sub-15-minute Recovery Time Objectives (RTO), and guaranteed zero data loss.",
        "specs": [
          "Immutable WORM cloud repositories preventing ransomware encryption or tampering.",
          "Sub-15-minute Recovery Time Objective (RTO) with instantaneous cloud virtual machine boot.",
          "Automated daily backup boot-test verification with screenshot validation logs.",
          "Comprehensive disaster recovery runbooks and semi-annual simulated recovery drills."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: RTO/RPO Objective Definition",
            "desc": "Establish maximum allowable data loss (RPO) and downtime (RTO) thresholds with business stakeholders."
          },
          {
            "phase": "Phase 2: Immutable Storage Staging",
            "desc": "Provision encrypted, air-gapped off-site cloud storage with Write-Once-Read-Many policies."
          },
          {
            "phase": "Phase 3: Continuous Snapshot Automation",
            "desc": "Configure hourly block-level differential snapshots across all critical database and app servers."
          },
          {
            "phase": "Phase 4: Disaster Recovery Drill",
            "desc": "Spin up complete virtualized corporate infrastructure in the cloud within 15 minutes."
          }
        ],
        "configPreview": {
          "type": "BCDR Policy Blueprint",
          "code": "{\n  \"backupEngine\": \"Immutable-Cloud-BCDR\",\n  \"targetRTO\": \"15 Minutes\",\n  \"targetRPO\": \"1 Hour\",\n  \"storageType\": \"Geo-Redundant-WORM-Encrypted\",\n  \"verificationSchedule\": \"Daily-Automated-Boot-Test\"\n}"
        },
        "compliance": [
          "ISO 22301 Business Continuity",
          "SOC 2 Type II",
          "PIPEDA"
        ]
      }
    ]
  },
  "business-automation": {
    "badge": "Enterprise Technology Suite",
    "title": "Business Workflow Automation & Data Pipelines",
    "serviceKey": "Business Automation",
    "overview": "Eliminate repetitive manual bottlenecks and accelerate organizational throughput with automated data pipelines, custom API integrations, and intelligent workflow automation.",
    "techStack": [
      "Zapier Enterprise",
      "Make (Integromat)",
      "Custom Python / Node ETL",
      "REST / GraphQL Webhooks",
      "CRM/ERP Middleware",
      "Automated Billing"
    ],
    "subFiles": [
      {
        "id": "workflow-automation",
        "title": "End-to-End Enterprise Workflow Automation",
        "category": "Process Automation",
        "summary": "Transform manual multi-step tasks into seamless automated trigger-action sequences across ERPs, CRMs, accounting software, and communication channels.",
        "specs": [
          "Cross-platform trigger-action workflows integrating Salesforce, HubSpot, QuickBooks, and Microsoft 365.",
          "Automated multi-level approval hierarchies via Microsoft Teams and interactive email actionable cards.",
          "Self-healing automation pipelines with intelligent retry backoff algorithms and alert notifications.",
          "Reduction of manual data entry labor by over 80% within the first 60 days of deployment."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Process Bottleneck Audit",
            "desc": "Map existing manual business processes, human handoff friction, and error frequencies."
          },
          {
            "phase": "Phase 2: Middleware & Schema Mapping",
            "desc": "Design unified JSON data models connecting disparate database and cloud application schemas."
          },
          {
            "phase": "Phase 3: Sandbox Pipeline Testing",
            "desc": "Execute test transaction batches in isolated staging environments with rigorous edge-case checks."
          },
          {
            "phase": "Phase 4: Production Deployment & Telemetry",
            "desc": "Activate live workflows with real-time audit logging and exception notifications."
          }
        ],
        "configPreview": {
          "type": "Node.js / Webhook Middleware",
          "code": "// Enterprise Automated Lead & Invoice Synchronization\nexport async function handleWebhook(payload) {\n  const validated = validateSchema(payload);\n  const customer = await syncCRM(validated.customer);\n  const invoice = await generateAccountingInvoice(customer, validated.items);\n  await notifyExecutiveTeam({ customer, invoice });\n  return { status: 'SUCCESS', invoiceId: invoice.id };\n}"
        },
        "compliance": [
          "Audit Logged",
          "Encrypted Payloads",
          "SOC 2 Compatible"
        ]
      },
      {
        "id": "data-pipelines-etl",
        "title": "Real-Time ETL Data Pipelines & Synchronizations",
        "category": "Data Engineering",
        "summary": "Real-time data extraction, transformation, and loading (ETL) ensuring synchronized datasets across all corporate databases without manual human intervention.",
        "specs": [
          "High-throughput event-driven data streaming between PostgreSQL, MongoDB, SQL Server, and cloud data warehouses.",
          "Automated schema validation, deduplication, and currency/date normalization across international systems.",
          "Real-time business intelligence dashboard synchronization (Power BI, Tableau, Looker).",
          "Encrypted data-in-transit and data-at-rest complying with enterprise financial standards."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Source & Sink Mapping",
            "desc": "Identify transactional source databases, API rate limits, and reporting warehouse targets."
          },
          {
            "phase": "Phase 2: Transformation Logic Build",
            "desc": "Develop custom Python/Node ETL transformation scripts with data sanitization and type checking."
          },
          {
            "phase": "Phase 3: Batch & Streaming Pipeline Setup",
            "desc": "Deploy streaming message brokers (Kafka/RabbitMQ) with high-availability clustering."
          },
          {
            "phase": "Phase 4: Data Integrity Verification",
            "desc": "Run automated reconciliation audits to verify 100% data consistency between source and sink."
          }
        ],
        "configPreview": {
          "type": "Python ETL Script",
          "code": "# Real-Time Enterprise Database Synchronizer\nimport psycopg2, requests\n\ndef sync_transaction_records():\n    records = fetch_unprocessed_transactions()\n    for r in records:\n        transformed = transform_currency_and_tax(r)\n        dispatch_to_erp_warehouse(transformed)\n        mark_record_processed(r.id)"
        },
        "compliance": [
          "ACID Compliant",
          "End-to-End Encrypted",
          "Financial Grade"
        ]
      }
    ]
  },
  "ai-solutions": {
    "badge": "Enterprise Technology Suite",
    "title": "AI & Intelligent Business Solutions",
    "serviceKey": "AI & Intelligent Solutions",
    "overview": "Empower your enterprise with practical Artificial Intelligence, custom Large Language Model (LLM) integrations, intelligent document automation, and predictive business analytics.",
    "techStack": [
      "Private LLMs (OpenAI / Anthropic)",
      "Vector Databases (Pinecone / Qdrant)",
      "RAG Architectures",
      "OCR & Vision AI",
      "Predictive Analytics",
      "On-Premise AI Sandboxes"
    ],
    "subFiles": [
      {
        "id": "private-enterprise-llm",
        "title": "Private Enterprise LLMs & Retrieval-Augmented Generation (RAG)",
        "category": "Generative AI & LLMs",
        "summary": "Deploy secure, private AI assistants and knowledge bases trained exclusively on your internal company documentation with zero public data leakage.",
        "specs": [
          "Enterprise RAG architecture querying thousands of internal PDFs, standard operating procedures, and database records instantly.",
          "Zero-Data-Retention guarantees ensuring private corporate IP is never shared or used to train public AI models.",
          "Role-based access control (RBAC) ensuring employees only query information matching their security clearance.",
          "Sub-second AI response generation with cited source document page links for 100% verifiable accuracy."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Document Corpus Ingestion",
            "desc": "Collect, clean, and chunk internal company documentation, contracts, and knowledge articles."
          },
          {
            "phase": "Phase 2: Vector Embedding Indexing",
            "desc": "Generate high-dimensional vector embeddings stored in encrypted vector databases with semantic search indexing."
          },
          {
            "phase": "Phase 3: Private LLM Sandbox Deployment",
            "desc": "Deploy dedicated LLM endpoint with strict prompt guardrails and output verification filters."
          },
          {
            "phase": "Phase 4: Internal Rollout & Testing",
            "desc": "Conduct department-level user acceptance testing and refine vector retrieval accuracy."
          }
        ],
        "configPreview": {
          "type": "Python RAG Pipeline",
          "code": "# Enterprise Retrieval-Augmented Generation (RAG) Query Engine\nfrom langchain.vectorstores import Pinecone\nfrom langchain.chat_models import ChatOpenAI\n\ndef query_private_knowledge_base(user_prompt):\n    context_chunks = vector_db.similarity_search(user_prompt, k=4)\n    prompt = construct_secure_prompt(context_chunks, user_prompt)\n    return private_llm.generate(prompt)"
        },
        "compliance": [
          "Zero Data Retention",
          "Confidentiality Guaranteed",
          "PIPEDA",
          "SOC 2"
        ]
      },
      {
        "id": "intelligent-document-processing",
        "title": "Intelligent Document Processing (IDP) & OCR",
        "category": "Vision AI & Document Automation",
        "summary": "Automated data extraction and classification from invoices, bills of lading, purchase orders, and contracts with 99%+ accuracy.",
        "specs": [
          "Computer Vision and NLP extracting unstructured invoice line items, dates, and amounts into structured JSON.",
          "Automated cross-referencing against ERP purchase orders to detect billing discrepancies or duplicate invoices.",
          "Confidence scoring engine routing low-confidence edge cases to human reviewers for verification.",
          "Processing thousands of complex multi-page documents per hour with zero human fatigue."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Document Sample Training",
            "desc": "Train vision models on representative samples of vendor invoices and transport bills."
          },
          {
            "phase": "Phase 2: Parser & Regex Validation",
            "desc": "Build automated extraction rules for currency symbols, tax rates, and vendor addresses."
          },
          {
            "phase": "Phase 3: ERP Connector Integration",
            "desc": "Connect OCR parser output directly into QuickBooks, SAP, or Microsoft Dynamics ERP."
          },
          {
            "phase": "Phase 4: Continuous Learning Loop",
            "desc": "Incorporate human reviewer corrections into model fine-tuning for continuous accuracy gains."
          }
        ],
        "configPreview": {
          "type": "Vision AI Pipeline",
          "code": "# Intelligent Document Processing & Line-Item Extraction\nimport vision_ai\n\ndef process_vendor_invoice(pdf_bytes):\n    document = vision_ai.extract_text_and_tables(pdf_bytes)\n    structured_invoice = vision_ai.parse_financial_schema(document)\n    return validate_and_post_to_accounting(structured_invoice)"
        },
        "compliance": [
          "99.4% Verified Accuracy",
          "Fraud Detection",
          "Audit Traceable"
        ]
      }
    ]
  },
  "software-web": {
    "badge": "Enterprise Technology Suite",
    "title": "Software, Web Applications & Custom Portals",
    "serviceKey": "Software & Web Solutions",
    "overview": "High-performance web applications, corporate client portals, internal management tools, and custom software systems built with modern, secure frameworks.",
    "techStack": [
      "React / Next.js",
      "Node.js / Express",
      "Python / FastAPI",
      "PostgreSQL / MongoDB",
      "GraphQL / REST APIs",
      "Docker / Kubernetes",
      "Tailwind CSS"
    ],
    "subFiles": [
      {
        "id": "custom-web-apps",
        "title": "Full-Stack Custom Web Applications & Portals",
        "category": "Custom Software Engineering",
        "summary": "Bespoke web applications and customer portals engineered with responsive UI/UX, microservices architecture, and sub-second database queries.",
        "specs": [
          "High-performance frontend built with modern React / Vue and server-side rendering for instant page transitions.",
          "Secure user authentication with JWT tokens, OAuth2, and role-based permissions.",
          "Scalable microservices backend designed for high concurrent user loads.",
          "Automated CI/CD deployment pipelines with zero-downtime rolling updates."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: UI/UX Wireframing & Scope",
            "desc": "Create interactive Figma prototypes, database entity relationship diagrams, and API contracts."
          },
          {
            "phase": "Phase 2: Full-Stack Engineering",
            "desc": "Develop responsive frontend components and secure RESTful/GraphQL backend services."
          },
          {
            "phase": "Phase 3: Automated QA & Security Auditing",
            "desc": "Conduct unit testing, end-to-end integration tests, and OWASP Top 10 penetration testing."
          },
          {
            "phase": "Phase 4: Cloud Production Launch",
            "desc": "Deploy to containerized cloud clusters with automated SSL certificates and CDN caching."
          }
        ],
        "configPreview": {
          "type": "TypeScript / React Component",
          "code": "// Enterprise Portal Data Grid Component\nexport const EnterprisePortalGrid = ({ records }: { records: DataRecord[] }) => {\n  return (\n    <div className=\"portal-glass-container\">\n      <DashboardHeader title=\"Live Operations Telemetry\" />\n      <DataTable data={records} onAction={handleSecureAction} />\n    </div>\n  );\n};"
        },
        "compliance": [
          "OWASP Top 10 Protected",
          "WCAG 2.1 AA Accessible",
          "SOC 2 Ready"
        ]
      }
    ]
  },
  "hparuba": {
    "badge": "Campus & Core Switching",
    "title": "HP / HPE Aruba Core Switching & Routing Architecture",
    "serviceKey": "Infrastructure Services",
    "overview": "High-availability core, distribution, and access layer architectures engineered with HPE Aruba CX and HP ProCurve switching hardware for mission-critical enterprise reliability.",
    "techStack": [
      "HPE Aruba CX Series (6000-6300)",
      "HP ProCurve",
      "AOS-CX",
      "Virtual Switching Framework (VSF)",
      "10G/40G Fiber Transceivers",
      "Layer 3 OSPF/BGP",
      "Aruba Instant On"
    ],
    "subFiles": [
      {
        "id": "aruba-cx-core",
        "title": "HPE Aruba CX Series Core & Distribution Switching",
        "category": "Core Enterprise Switching",
        "summary": "Cloud-native AOS-CX operating system, embedded Network Analytics Engine (NAE), Virtual Switching Framework (VSF) hardware stacking, and sub-millisecond failover.",
        "specs": [
          "VSF stacking aggregating multiple physical switches into a single logical high-availability core chassis.",
          "Network Analytics Engine (NAE) with automated real-time Python telemetry and anomaly detection.",
          "Dynamic Segmentation tunneling wired port traffic automatically to central security firewalls.",
          "10G/40G/100G SFP+ optical fiber uplinks delivering non-blocking wire-speed backplane throughput."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Core Topology Engineering",
            "desc": "Design redundant spine-and-leaf or collapsed core architecture with redundant fiber backbones."
          },
          {
            "phase": "Phase 2: AOS-CX VSF Stacking",
            "desc": "Configure 40G dedicated stacking links between switches with split-brain detection."
          },
          {
            "phase": "Phase 3: Layer 3 Routing & QoS",
            "desc": "Enact OSPF dynamic routing, VRRP default gateways, and strict DSCP QoS for telephony."
          },
          {
            "phase": "Phase 4: Redundancy Testing",
            "desc": "Perform power-loss failover tests to confirm zero packet loss across active connections."
          }
        ],
        "configPreview": {
          "type": "Aruba AOS-CX CLI",
          "code": "# Configure Aruba CX VSF High-Availability Core Stack\nvsf member 1\n  type JL659A\n  link 1 1/1/49,1/1/50\nvsf member 2\n  type JL659A\n  link 1 2/1/49,2/1/50\nvsf secondary-member 2\nvsf split-detect-method mgmt"
        },
        "compliance": [
          "Non-Blocking Wire Speed",
          "Enterprise High Availability",
          "FIPS Compliant"
        ]
      }
    ]
  },
  "tplink": {
    "badge": "Cloud-Managed SDN Architecture",
    "title": "TP-Link Omada SDN & Business Networking Systems",
    "serviceKey": "Network Operations Services",
    "overview": "Cost-effective, highly reliable enterprise networks powered by TP-Link Omada Software Defined Networking (SDN) controllers, managed PoE+ switches, and high-performance wireless access points.",
    "techStack": [
      "TP-Link Omada SDN",
      "JetStream 10G Managed Switches",
      "SafeStream Multi-WAN Gateways",
      "Omada Cloud Controller",
      "Omada WiFi 6/7",
      "Outdoor Wireless Bridges"
    ],
    "subFiles": [
      {
        "id": "omada-cloud-sdn",
        "title": "Omada Centralized Cloud SDN Controller & Automation",
        "category": "Software Defined Networking",
        "summary": "Zero-Touch Provisioning (ZTP), centralized cloud management, real-time multi-site topology mapping, and automated firmware governance.",
        "specs": [
          "Unified cloud dashboard managing routers, switches, and access points across multiple physical offices.",
          "Zero-Touch Provisioning (ZTP) enabling remote branch deployments without on-site IT technicians.",
          "AI-driven channel selection and automatic power adjustments reducing RF interference.",
          "Captive portals with voucher, SMS, and LDAP authentication for corporate and guest WiFi."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Site Cloud Architecture",
            "desc": "Provision cloud controller site profiles, VLAN definitions, and SSID parameters."
          },
          {
            "phase": "Phase 2: Hardware Adoption",
            "desc": "Connect switches and APs to cloud controller via secure TLS adoption tunnels."
          },
          {
            "phase": "Phase 3: Policy Deployment",
            "desc": "Push VLAN tagging, ACL rules, and bandwidth throttling profiles to all edge devices."
          },
          {
            "phase": "Phase 4: Remote Monitoring",
            "desc": "Establish automated threshold alerts for ISP latency and rogue AP detection."
          }
        ],
        "configPreview": {
          "type": "Omada Controller Schema",
          "code": "{\n  \"controller\": \"Omada Cloud SDN\",\n  \"siteName\": \"Technosoft-Branch-Office\",\n  \"autoChannel\": true,\n  \"roamingOptimization\": { \"fastRoaming\": true, \"minRssi\": -75 },\n  \"cloudBackup\": \"Daily-Automated\"\n}"
        },
        "compliance": [
          "Cloud SDN Standard",
          "WPA3 Ready",
          "Multi-Tenant"
        ]
      }
    ]
  },
  "multivendor": {
    "badge": "Hardware & Datacenter Infrastructure",
    "title": "Multi-Vendor Enterprise Infrastructure & Server Racks",
    "serviceKey": "Infrastructure Services",
    "overview": "Comprehensive physical and logical infrastructure deployment across Cisco, Dell, structured cabling, 42U server rack installations, and mission-critical server closet environments.",
    "techStack": [
      "Cisco Catalyst",
      "Dell PowerSwitch",
      "42U Server Racks",
      "Cat6A Shielded",
      "Single/Multi-Mode Fiber",
      "APC Smart-UPS",
      "Patch Panels"
    ],
    "subFiles": [
      {
        "id": "server-rack-cabling",
        "title": "42U Server Rack Installation & Structured Fiber Cabling",
        "category": "Physical Infrastructure & Datacenter",
        "summary": "Precision server mounting, managed PDU power distribution, APC UPS battery backup installations, color-coded Cat6A cabling, and fiber optic terminations.",
        "specs": [
          "Precision 42U rack layout with hot/cold aisle thermal airflow containment.",
          "Managed PDU power distribution with per-outlet remote power-cycling capabilities.",
          "APC Smart-UPS backup power with automated graceful virtual machine shutdown scripts.",
          "Fluke DSX-8000 certified Cat6A and multi-mode OM4 fiber terminations."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Rack Elevation Blueprint",
            "desc": "Draft detailed U-by-U equipment elevations, weight distributions, and thermal dissipation metrics."
          },
          {
            "phase": "Phase 2: Physical Mount & Cable Dressing",
            "desc": "Mount rails, servers, and switches with color-coded horizontal cable managers."
          },
          {
            "phase": "Phase 3: Termination & Certification",
            "desc": "Terminate patch panels and test all drops with Fluke certifiers for 10Gbps pass ratings."
          },
          {
            "phase": "Phase 4: Power Redundancy Testing",
            "desc": "Conduct live UPS load tests and automatic transfer switch (ATS) power cut simulations."
          }
        ],
        "configPreview": {
          "type": "Datacenter Rack Specification",
          "code": "# 42U Enterprise Rack Allocation Blueprint\nU40-U42: 10G/40G Fiber Patch Panels & Distribution Switches\nU38-U39: Cisco / Aruba Core Switch Stack (VSF / Virtual Chassis)\nU20-U36: Clustered Virtualization Hypervisors & All-Flash Storage (SAN)\nU01-U04: Dual Redundant 3000VA APC Smart-UPS Battery Arrays"
        },
        "compliance": [
          "TIA-942 Datacenter Standard",
          "Fluke Certified",
          "ISO/IEC 11801"
        ]
      }
    ]
  },
  "core-matrix": {
    "badge": "Central Command & Architecture Matrix",
    "title": "Technosoft Masters Core Architecture Matrix (24/7/365)",
    "serviceKey": "Managed IT & Infrastructure",
    "overview": "A unified command architecture overseeing high-availability IT infrastructure, real-time security monitoring, and automated enterprise workflows from Mississauga Headquarters.",
    "techStack": [
      "24/7 Telemetry NOC",
      "Active Directory / Entra ID",
      "Next-Gen Firewalls",
      "Cloud Orchestration",
      "Automated Failover",
      "Emergency Field SLA"
    ],
    "subFiles": [
      {
        "id": "telemetry-command",
        "title": "24/7/365 Real-Time Telemetry & Systems Health Monitoring",
        "category": "Continuous Operations",
        "summary": "Proactive monitoring across servers, switches, cloud instances, and database pipelines with sub-second automated alert dispatch.",
        "specs": [
          "Continuous heartbeat monitoring across CPU, RAM, disk latency, and network throughput.",
          "Automated self-healing triggers restarting failed microservices before users detect an issue.",
          "Dedicated Mississauga engineering dispatch for mission-critical on-site hardware replacements.",
          "Guaranteed 15-minute emergency response SLA."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Telemetry Sensor Deployment",
            "desc": "Install monitoring agents on all physical and cloud endpoints."
          },
          {
            "phase": "Phase 2: Threshold Tuning",
            "desc": "Establish statistical baseline anomaly thresholds to eliminate false positives."
          },
          {
            "phase": "Phase 3: Automated Incident Escalation",
            "desc": "Configure automated SMS, call, and ticket escalation trees to senior engineers."
          },
          {
            "phase": "Phase 4: Monthly Executive SLA Reports",
            "desc": "Deliver uptime metrics, patch compliance summaries, and capacity planning forecasts."
          }
        ],
        "configPreview": {
          "type": "NOC Telemetry Metric",
          "code": "{\n  \"monitoringEngine\": \"TM-Enterprise-NOC\",\n  \"uptimeTarget\": \"99.99%\",\n  \"pollingInterval\": \"15s\",\n  \"escalationTree\": [\"L1 Automated Self-Healing\", \"L2 Senior Systems Engineer\", \"L3 Field Dispatch\"]\n}"
        },
        "compliance": [
          "24/7/365 Active",
          "Guaranteed SLA",
          "Mississauga HQ Based"
        ]
      }
    ]
  },
  "vision": {
    "badge": "Corporate Strategy & Philosophy",
    "title": "Innovate \u2022 Automate \u2022 Elevate \u2014 The Technosoft Masters Standard",
    "serviceKey": "Technology Consulting",
    "overview": "Technosoft Masters Inc. is driven by a three-pillar methodology designed to give Canadian and North American enterprises an unfair technical and operational advantage.",
    "techStack": [
      "Cloud Native",
      "Workflow RPA",
      "Zero-Trust Security",
      "Intelligent AI",
      "Continuous SLA Monitoring"
    ],
    "subFiles": [
      {
        "id": "innovate-pillar",
        "title": "INNOVATE: Future-Proof Technology Architectures",
        "category": "Core Philosophy",
        "summary": "Adopting next-generation cloud infrastructure, containerized microservices, and AI models before competitors even realize they exist.",
        "specs": [
          "Building modular, scalable architectures engineered for effortless 10x growth.",
          "Eliminating technical debt through clean, typed codebases and automated testing.",
          "Continuous adoption of cutting-edge hardware and cloud breakthroughs."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Technology Horizon Scanning",
            "desc": "Continuously evaluate emerging tech frameworks and enterprise platforms."
          },
          {
            "phase": "Phase 2: Proof of Concept (PoC) Testing",
            "desc": "Validate new tools in controlled sandbox environments before enterprise recommendation."
          },
          {
            "phase": "Phase 3: Production Hardening",
            "desc": "Integrate vetted technologies into client environments with comprehensive documentation."
          },
          {
            "phase": "Phase 4: Client Competitive Advantage",
            "desc": "Accelerate client time-to-market and operational throughput."
          }
        ],
        "configPreview": {
          "type": "Strategic Principle",
          "code": "# Core Principle: INNOVATE\nAlways architect for tomorrow's scale while delivering immediate business value today.\nEliminate legacy friction. Build with resilience."
        },
        "compliance": [
          "Future-Proof",
          "Zero-Debt Engineering"
        ]
      }
    ]
  },
  "solutions-tomorrow": {
    "badge": "Strategic Technology Roadmap",
    "title": "Technology Today, Solutions Tomorrow \u2014 Enterprise Blueprint",
    "serviceKey": "Technology Consulting",
    "overview": "We build systems not just for the challenges of today, but engineered to scale effortlessly into the operational demands and regulatory landscapes of tomorrow.",
    "techStack": [
      "Hybrid Cloud",
      "Private AI Models",
      "Automated DevOps",
      "Next-Gen Cybersecurity",
      "Resilient Data Lakes"
    ],
    "subFiles": [
      {
        "id": "scalable-foundations",
        "title": "Scalable Cloud Foundations & Modernization",
        "category": "Roadmap Architecture",
        "summary": "Multi-region architectures and elastic compute clusters that automatically scale with seasonal or unexpected business surges.",
        "specs": [
          "Elastic auto-scaling compute pools handling sudden traffic surges without performance degradation.",
          "Data warehousing structured for private AI and predictive machine learning models.",
          "Continuous vulnerability scanning and automated compliance posture alignment."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: 3-Year Strategic Roadmapping",
            "desc": "Align IT infrastructure investments with projected business growth milestones."
          },
          {
            "phase": "Phase 2: Milestone Execution",
            "desc": "Deploy phased infrastructure enhancements on quarterly sprint cycles."
          },
          {
            "phase": "Phase 3: Performance Validation",
            "desc": "Conduct annual load testing and security penetration evaluations."
          },
          {
            "phase": "Phase 4: Long-Term Partnership",
            "desc": "Continuous technology guidance ensuring ongoing operational leadership."
          }
        ],
        "configPreview": {
          "type": "Roadmap Blueprint",
          "code": "# Enterprise Strategic Technology Roadmap\nYear 1: Cloud Migration & Zero-Trust Perimeter Security\nYear 2: Workflow Automation & Real-Time Data Pipelines\nYear 3: Private AI Integration & Predictive Intelligence"
        },
        "compliance": [
          "Strategic Alignment",
          "Continuous Innovation"
        ]
      }
    ]
  },
  "it-solutions": {
    "badge": "Enterprise Architecture & Cloud Systems",
    "title": "Modern IT Architecture & High-Availability Infrastructure",
    "serviceKey": "IT Solutions",
    "overview": "Technosoft Masters Inc. designs and deploys next-generation modern IT architectures that unify cloud ecosystems, on-premise compute infrastructure, zero-trust cybersecurity, and automated data pipelines for maximum enterprise scalability, reliability, and security.",
    "techStack": [
      "Hybrid Cloud",
      "Microsoft Azure / AWS",
      "Hyper-V / VMware Clusters",
      "10G/40G Fiber Fabrics",
      "Zero-Trust IAM",
      "Microsoft Intune",
      "Disaster Recovery (BCDR)",
      "24/7 Telemetry"
    ],
    "subFiles": [
      {
        "id": "hybrid-compute",
        "title": "Hybrid Cloud & Multi-Tier Compute Infrastructure",
        "category": "Compute & Infrastructure",
        "summary": "High-availability virtualized server clusters, cloud-native microservices, automated load balancing, and sub-millisecond network peering.",
        "specs": [
          "Active-Active clustered virtualization environments with automated instant failover.",
          "Microservices containerization using Docker and Kubernetes orchestration.",
          "Sub-millisecond hybrid cloud interconnects bridging on-premise hardware to Azure/AWS.",
          "Automated compute resource re-balancing during peak business operational hours."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Compute & IOPS Profiling",
            "desc": "Evaluate CPU workload peaks, RAM saturation, and disk read/write throughput."
          },
          {
            "phase": "Phase 2: Redundant Cluster Deployment",
            "desc": "Build clustered server nodes with dual-path redundant power and network teaming."
          },
          {
            "phase": "Phase 3: Workload Containerization",
            "desc": "Migrate monolithic legacy applications into decoupled, resilient container services."
          },
          {
            "phase": "Phase 4: Automated Failover Drills",
            "desc": "Simulate node hardware crashes to guarantee continuous zero-drop application availability."
          }
        ],
        "configPreview": {
          "type": "Architecture Cluster Config",
          "code": "# High-Availability Compute Cluster Specification\ncluster_definition:\n  nodes: 4\n  cpu_cores: 128\n  memory_total: 1024GB\n  storage_tier: \"NVMe All-Flash S2D\"\n  failover_policy: \"Automated-Zero-Downtime\"\n  hybrid_cloud_peer: \"Azure-Canada-Central\""
        },
        "compliance": [
          "99.999% SLA",
          "Fault-Tolerant Design",
          "Enterprise Scalability"
        ]
      },
      {
        "id": "bcdr-disaster-recovery",
        "title": "Disaster Recovery & Business Continuity (BCDR)",
        "category": "Resilience & Recovery",
        "summary": "Automated off-site replication, immutable ransomware-proof cloud snapshots, sub-15-minute Recovery Time Objectives (RTO), and guaranteed zero data loss.",
        "specs": [
          "Immutable WORM cloud repositories preventing ransomware encryption or tampering.",
          "Sub-15-minute Recovery Time Objective (RTO) with instantaneous cloud virtual machine boot.",
          "Automated daily backup boot-test verification with screenshot validation logs.",
          "Comprehensive disaster recovery runbooks and semi-annual simulated recovery drills."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: RTO/RPO Objective Definition",
            "desc": "Establish maximum allowable data loss (RPO) and downtime (RTO) thresholds with business stakeholders."
          },
          {
            "phase": "Phase 2: Immutable Storage Staging",
            "desc": "Provision encrypted, air-gapped off-site cloud storage with Write-Once-Read-Many policies."
          },
          {
            "phase": "Phase 3: Continuous Snapshot Automation",
            "desc": "Configure hourly block-level differential snapshots across all critical database and app servers."
          },
          {
            "phase": "Phase 4: Disaster Recovery Drill",
            "desc": "Spin up complete virtualized corporate infrastructure in the cloud within 15 minutes."
          }
        ],
        "configPreview": {
          "type": "BCDR Policy Blueprint",
          "code": "{\n  \"backupEngine\": \"Immutable-Cloud-BCDR\",\n  \"targetRTO\": \"15 Minutes\",\n  \"targetRPO\": \"1 Hour\",\n  \"storageType\": \"Geo-Redundant-WORM-Encrypted\",\n  \"verificationSchedule\": \"Daily-Automated-Boot-Test\"\n}"
        },
        "compliance": [
          "ISO 22301 Business Continuity",
          "SOC 2 Type II",
          "PIPEDA"
        ]
      }
    ]
  },
  "custom-systems": {
    "badge": "Enterprise Architecture & Cloud Systems",
    "title": "Modern IT Architecture & High-Availability Infrastructure",
    "serviceKey": "IT Solutions",
    "overview": "Technosoft Masters Inc. designs and deploys next-generation modern IT architectures that unify cloud ecosystems, on-premise compute infrastructure, zero-trust cybersecurity, and automated data pipelines for maximum enterprise scalability, reliability, and security.",
    "techStack": [
      "Hybrid Cloud",
      "Microsoft Azure / AWS",
      "Hyper-V / VMware Clusters",
      "10G/40G Fiber Fabrics",
      "Zero-Trust IAM",
      "Microsoft Intune",
      "Disaster Recovery (BCDR)",
      "24/7 Telemetry"
    ],
    "subFiles": [
      {
        "id": "hybrid-compute",
        "title": "Hybrid Cloud & Multi-Tier Compute Infrastructure",
        "category": "Compute & Infrastructure",
        "summary": "High-availability virtualized server clusters, cloud-native microservices, automated load balancing, and sub-millisecond network peering.",
        "specs": [
          "Active-Active clustered virtualization environments with automated instant failover.",
          "Microservices containerization using Docker and Kubernetes orchestration.",
          "Sub-millisecond hybrid cloud interconnects bridging on-premise hardware to Azure/AWS.",
          "Automated compute resource re-balancing during peak business operational hours."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Compute & IOPS Profiling",
            "desc": "Evaluate CPU workload peaks, RAM saturation, and disk read/write throughput."
          },
          {
            "phase": "Phase 2: Redundant Cluster Deployment",
            "desc": "Build clustered server nodes with dual-path redundant power and network teaming."
          },
          {
            "phase": "Phase 3: Workload Containerization",
            "desc": "Migrate monolithic legacy applications into decoupled, resilient container services."
          },
          {
            "phase": "Phase 4: Automated Failover Drills",
            "desc": "Simulate node hardware crashes to guarantee continuous zero-drop application availability."
          }
        ],
        "configPreview": {
          "type": "Architecture Cluster Config",
          "code": "# High-Availability Compute Cluster Specification\ncluster_definition:\n  nodes: 4\n  cpu_cores: 128\n  memory_total: 1024GB\n  storage_tier: \"NVMe All-Flash S2D\"\n  failover_policy: \"Automated-Zero-Downtime\"\n  hybrid_cloud_peer: \"Azure-Canada-Central\""
        },
        "compliance": [
          "99.999% SLA",
          "Fault-Tolerant Design",
          "Enterprise Scalability"
        ]
      },
      {
        "id": "bcdr-disaster-recovery",
        "title": "Disaster Recovery & Business Continuity (BCDR)",
        "category": "Resilience & Recovery",
        "summary": "Automated off-site replication, immutable ransomware-proof cloud snapshots, sub-15-minute Recovery Time Objectives (RTO), and guaranteed zero data loss.",
        "specs": [
          "Immutable WORM cloud repositories preventing ransomware encryption or tampering.",
          "Sub-15-minute Recovery Time Objective (RTO) with instantaneous cloud virtual machine boot.",
          "Automated daily backup boot-test verification with screenshot validation logs.",
          "Comprehensive disaster recovery runbooks and semi-annual simulated recovery drills."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: RTO/RPO Objective Definition",
            "desc": "Establish maximum allowable data loss (RPO) and downtime (RTO) thresholds with business stakeholders."
          },
          {
            "phase": "Phase 2: Immutable Storage Staging",
            "desc": "Provision encrypted, air-gapped off-site cloud storage with Write-Once-Read-Many policies."
          },
          {
            "phase": "Phase 3: Continuous Snapshot Automation",
            "desc": "Configure hourly block-level differential snapshots across all critical database and app servers."
          },
          {
            "phase": "Phase 4: Disaster Recovery Drill",
            "desc": "Spin up complete virtualized corporate infrastructure in the cloud within 15 minutes."
          }
        ],
        "configPreview": {
          "type": "BCDR Policy Blueprint",
          "code": "{\n  \"backupEngine\": \"Immutable-Cloud-BCDR\",\n  \"targetRTO\": \"15 Minutes\",\n  \"targetRPO\": \"1 Hour\",\n  \"storageType\": \"Geo-Redundant-WORM-Encrypted\",\n  \"verificationSchedule\": \"Daily-Automated-Boot-Test\"\n}"
        },
        "compliance": [
          "ISO 22301 Business Continuity",
          "SOC 2 Type II",
          "PIPEDA"
        ]
      }
    ]
  },
  "modern-it-architecture": {
    "badge": "Enterprise Architecture & Cloud Systems",
    "title": "Modern IT Architecture & High-Availability Infrastructure",
    "serviceKey": "IT Solutions",
    "overview": "Technosoft Masters Inc. designs and deploys next-generation modern IT architectures that unify cloud ecosystems, on-premise compute infrastructure, zero-trust cybersecurity, and automated data pipelines for maximum enterprise scalability, reliability, and security.",
    "techStack": [
      "Hybrid Cloud",
      "Microsoft Azure / AWS",
      "Hyper-V / VMware Clusters",
      "10G/40G Fiber Fabrics",
      "Zero-Trust IAM",
      "Microsoft Intune",
      "Disaster Recovery (BCDR)",
      "24/7 Telemetry"
    ],
    "subFiles": [
      {
        "id": "hybrid-compute",
        "title": "Hybrid Cloud & Multi-Tier Compute Infrastructure",
        "category": "Compute & Infrastructure",
        "summary": "High-availability virtualized server clusters, cloud-native microservices, automated load balancing, and sub-millisecond network peering.",
        "specs": [
          "Active-Active clustered virtualization environments with automated instant failover.",
          "Microservices containerization using Docker and Kubernetes orchestration.",
          "Sub-millisecond hybrid cloud interconnects bridging on-premise hardware to Azure/AWS.",
          "Automated compute resource re-balancing during peak business operational hours."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Compute & IOPS Profiling",
            "desc": "Evaluate CPU workload peaks, RAM saturation, and disk read/write throughput."
          },
          {
            "phase": "Phase 2: Redundant Cluster Deployment",
            "desc": "Build clustered server nodes with dual-path redundant power and network teaming."
          },
          {
            "phase": "Phase 3: Workload Containerization",
            "desc": "Migrate monolithic legacy applications into decoupled, resilient container services."
          },
          {
            "phase": "Phase 4: Automated Failover Drills",
            "desc": "Simulate node hardware crashes to guarantee continuous zero-drop application availability."
          }
        ],
        "configPreview": {
          "type": "Architecture Cluster Config",
          "code": "# High-Availability Compute Cluster Specification\ncluster_definition:\n  nodes: 4\n  cpu_cores: 128\n  memory_total: 1024GB\n  storage_tier: \"NVMe All-Flash S2D\"\n  failover_policy: \"Automated-Zero-Downtime\"\n  hybrid_cloud_peer: \"Azure-Canada-Central\""
        },
        "compliance": [
          "99.999% SLA",
          "Fault-Tolerant Design",
          "Enterprise Scalability"
        ]
      },
      {
        "id": "bcdr-disaster-recovery",
        "title": "Disaster Recovery & Business Continuity (BCDR)",
        "category": "Resilience & Recovery",
        "summary": "Automated off-site replication, immutable ransomware-proof cloud snapshots, sub-15-minute Recovery Time Objectives (RTO), and guaranteed zero data loss.",
        "specs": [
          "Immutable WORM cloud repositories preventing ransomware encryption or tampering.",
          "Sub-15-minute Recovery Time Objective (RTO) with instantaneous cloud virtual machine boot.",
          "Automated daily backup boot-test verification with screenshot validation logs.",
          "Comprehensive disaster recovery runbooks and semi-annual simulated recovery drills."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: RTO/RPO Objective Definition",
            "desc": "Establish maximum allowable data loss (RPO) and downtime (RTO) thresholds with business stakeholders."
          },
          {
            "phase": "Phase 2: Immutable Storage Staging",
            "desc": "Provision encrypted, air-gapped off-site cloud storage with Write-Once-Read-Many policies."
          },
          {
            "phase": "Phase 3: Continuous Snapshot Automation",
            "desc": "Configure hourly block-level differential snapshots across all critical database and app servers."
          },
          {
            "phase": "Phase 4: Disaster Recovery Drill",
            "desc": "Spin up complete virtualized corporate infrastructure in the cloud within 15 minutes."
          }
        ],
        "configPreview": {
          "type": "BCDR Policy Blueprint",
          "code": "{\n  \"backupEngine\": \"Immutable-Cloud-BCDR\",\n  \"targetRTO\": \"15 Minutes\",\n  \"targetRPO\": \"1 Hour\",\n  \"storageType\": \"Geo-Redundant-WORM-Encrypted\",\n  \"verificationSchedule\": \"Daily-Automated-Boot-Test\"\n}"
        },
        "compliance": [
          "ISO 22301 Business Continuity",
          "SOC 2 Type II",
          "PIPEDA"
        ]
      }
    ]
  },
  "cloud-solutions": {
    "badge": "Authorized Strategic Alliance",
    "title": "Microsoft Enterprise Cloud & Infrastructure Solutions",
    "serviceKey": "Cloud Solutions",
    "overview": "As an authorized Microsoft ecosystem partner, Technosoft Masters Inc. designs, migrates, and orchestrates enterprise-grade cloud environments, productivity platforms, and zero-trust identity architectures tailored for scale, security, and Canadian regulatory compliance.",
    "techStack": [
      "Microsoft Azure",
      "Microsoft 365",
      "Entra ID (Azure AD)",
      "Windows Server 2025",
      "Hyper-V Clustering",
      "Microsoft Intune",
      "SharePoint Online",
      "Azure Arc"
    ],
    "subFiles": [
      {
        "id": "azure-cloud",
        "title": "Microsoft Azure Hybrid Cloud Architecture",
        "category": "Cloud Computing & Compute",
        "summary": "High-availability Azure VMs, scalable Azure SQL databases, serverless functions, and secure virtual network (VNet) peering with on-premise datacenter interconnects.",
        "specs": [
          "Multi-region geo-redundant virtual machine scale sets (VMSS) with 99.99% uptime SLAs.",
          "High-performance Azure SQL Managed Instances with automated geo-replication and point-in-time restore.",
          "Secure ExpressRoute & Site-to-Site IPsec VPN tunnels bridging local infrastructure to Azure VNets.",
          "Azure Cost Management & Reserved Instance (RI) optimization yielding up to 45% annual cloud savings."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Workload & TCO Assessment",
            "desc": "Audit on-premise compute usage, IOPS, RAM, and bandwidth requirements to establish exact Azure VM sizing and migration cost projections."
          },
          {
            "phase": "Phase 2: Hybrid Landing Zone Setup",
            "desc": "Provision Azure Resource Groups, Virtual Networks, Subnet NSGs, Key Vaults, and ExpressRoute / IPsec gateways."
          },
          {
            "phase": "Phase 3: Zero-Downtime Data Migration",
            "desc": "Execute live database synchronization and VM block replication via Azure Migrate with zero daytime operational interruption."
          },
          {
            "phase": "Phase 4: 24/7 Telemetry & Health Checks",
            "desc": "Activate Azure Monitor, Log Analytics workspace alerts, automated auto-scaling rules, and quarterly cost-optimization audits."
          }
        ],
        "configPreview": {
          "type": "PowerShell / Azure CLI",
          "code": "# Deploy High-Availability Enterprise Azure Landing Zone\n$ResourceGroup = \"TM-Enterprise-Prod-RG\"\n$Location = \"canadacentral\"\n\nNew-AzResourceGroup -Name $ResourceGroup -Location $Location\n$VNet = New-AzVirtualNetwork -ResourceGroupName $ResourceGroup -Name \"TM-Core-VNet\" -AddressPrefix \"10.240.0.0/16\"\nAdd-AzVirtualNetworkSubnetConfig -Name \"Compute-Subnet\" -AddressPrefix \"10.240.1.0/24\" -VirtualNetwork $VNet\n$VNet | Set-AzVirtualNetwork"
        },
        "compliance": [
          "PIPEDA Canadian Data Residency",
          "SOC 2 Type II",
          "ISO 27001",
          "HIPAA"
        ]
      },
      {
        "id": "m365-enterprise",
        "title": "Microsoft 365 Enterprise Ecosystem & Collaboration",
        "category": "Workplace Productivity",
        "summary": "Comprehensive deployment of Exchange Online, SharePoint Online corporate intranets, Teams voice/collaboration governance, and OneDrive enterprise synchronization.",
        "specs": [
          "Zero-data-loss email migration from legacy IMAP/Exchange to Exchange Online with unlimited archive retention.",
          "Custom SharePoint Online document libraries with automated metadata tagging and retention labels.",
          "Enterprise Microsoft Teams governance including secure guest access, DLP inspection, and policy packages.",
          "Exchange Online Protection (EOP) and Microsoft Defender for Office 365 anti-phishing safeguards."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Mailbox & Tenant Discovery",
            "desc": "Analyze existing mail sizes, distribution lists, shared mailboxes, and MX record DNS propagation parameters."
          },
          {
            "phase": "Phase 2: Staged Cloud Migration",
            "desc": "Establish hybrid Exchange routing and synchronize initial mailboxes in batches to eliminate user disruption."
          },
          {
            "phase": "Phase 3: Domain & DNS Cutover",
            "desc": "Switch MX, SPF, DKIM, and DMARC security records during scheduled off-hours maintenance."
          },
          {
            "phase": "Phase 4: User Onboarding & Support",
            "desc": "Automated Outlook/Teams profile provisioning, mobile device setup, and end-user productivity tutorials."
          }
        ],
        "configPreview": {
          "type": "PowerShell / Exchange Online",
          "code": "# Enforce Enterprise Security & Anti-Phishing Baseline\nConnect-ExchangeOnline -UserPrincipalName admin@technosoftmasters.com\nSet-MailboxPlan -Identity \"ExchangeOnlineEnterprise\" -AuditEnabled $true\nSet-MalwareFilterPolicy -Identity \"Default\" -EnableInternalMessagesFilter $true -Action DeleteMessage"
        },
        "compliance": [
          "TLS 1.3 Encryption",
          "Canadian Privacy Laws",
          "GDPR",
          "Anti-Spam CASL"
        ]
      },
      {
        "id": "entra-id-iam",
        "title": "Microsoft Entra ID (Azure AD) & Zero-Trust IAM",
        "category": "Identity & Access Governance",
        "summary": "Zero-trust identity management, Multi-Factor Authentication (MFA), Conditional Access policies, role-based access control (RBAC), and Single Sign-On (SSO).",
        "specs": [
          "Conditional Access policies enforcing MFA based on IP geolocation, device health posture, and risk level.",
          "Single Sign-On (SSO) integration across 100+ cloud SaaS applications using SAML 2.0 and OpenID Connect.",
          "Privileged Identity Management (PIM) providing time-bound, approval-required just-in-time administrative access.",
          "Self-Service Password Reset (SSPR) with automated on-premise Active Directory writeback."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Identity & Role Audit",
            "desc": "Map corporate org charts, administrative privilege tiers, and active user directories."
          },
          {
            "phase": "Phase 2: Hybrid Directory Sync",
            "desc": "Deploy Microsoft Entra Connect with password hash synchronization and seamless SSO."
          },
          {
            "phase": "Phase 3: Conditional Access Enactment",
            "desc": "Enforce biometric MFA, compliant device requirements, and block legacy basic authentication protocols."
          },
          {
            "phase": "Phase 4: Risk Analytics & PIM",
            "desc": "Enable real-time identity protection alerts for impossible travel and leaked credential detection."
          }
        ],
        "configPreview": {
          "type": "JSON Policy Rule",
          "code": "{\n  \"displayName\": \"Enforce-MFA-All-Corporate-Users\",\n  \"state\": \"enabled\",\n  \"conditions\": {\n    \"users\": { \"includeUsers\": [\"All\"] },\n    \"applications\": { \"includeApplications\": [\"All\"] },\n    \"clientAppTypes\": [\"browser\", \"mobileAppsAndDesktopClients\"]\n  },\n  \"grantControls\": { \"operator\": \"OR\", \"builtInControls\": [\"mfa\", \"compliantDevice\"] }\n}"
        },
        "compliance": [
          "NIST 800-63B",
          "Zero-Trust Framework",
          "SOC 2 Type II",
          "PIPEDA"
        ]
      },
      {
        "id": "intune-endpoints",
        "title": "Microsoft Intune Cloud Endpoint & Fleet Management",
        "category": "Device & Fleet Governance",
        "summary": "Cloud-based Unified Endpoint Management (UEM), automated software distribution, security baselines, and zero-touch Windows Autopilot provisioning for corporate fleets.",
        "specs": [
          "Zero-touch Windows Autopilot deployment: shipped devices configure automatically upon first employee login.",
          "Automated BitLocker disk encryption with centralized cloud recovery key escrow.",
          "Unified policy management across Windows 11, macOS, iOS, and Android mobile devices.",
          "Remote device wipe, corporate data isolation (MAM), and automated operating system patch rings."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Fleet Inventory Mapping",
            "desc": "Catalog corporate hardware models, OEM serial numbers, and required departmental application suites."
          },
          {
            "phase": "Phase 2: Compliance Profile Staging",
            "desc": "Build BitLocker, firewall, password complexity, and antivirus compliance profiles in Microsoft Intune."
          },
          {
            "phase": "Phase 3: Zero-Touch Autopilot Setup",
            "desc": "Register device hardware hashes with Microsoft Partner Center for instant out-of-the-box cloud enrollment."
          },
          {
            "phase": "Phase 4: Automated Patch Rings",
            "desc": "Configure Quality and Feature update rings ensuring zero security vulnerabilities across corporate laptops."
          }
        ],
        "configPreview": {
          "type": "PowerShell Intune Graph",
          "code": "# Verify Enterprise Fleet Encryption & Security Baseline\n$Devices = Get-IntuneManagedDevice | Select-Object deviceName, operatingSystem, complianceState\n$Devices | Where-Object { $_.complianceState -ne \"compliant\" } | ForEach-Object {\n    Invoke-IntuneDeviceSync -DeviceId $_.id\n}"
        },
        "compliance": [
          "CIS Benchmarks",
          "ISO 27001",
          "SOC 2",
          "PIPEDA"
        ]
      },
      {
        "id": "windows-server-hyperv",
        "title": "Windows Server 2025 & Hyper-V Virtualization",
        "category": "On-Premise Infrastructure",
        "summary": "Failover clustering, Active Directory Domain Services (AD DS), Group Policy automation, Storage Spaces Direct (S2D), and seamless Azure Arc hybrid management.",
        "specs": [
          "Hyper-V Failover Clustering with automated virtual machine live migration and zero downtime.",
          "Active Directory Domain Services (AD DS) multi-master replication with automated forest backup.",
          "Storage Spaces Direct (S2D) software-defined SAN storage delivering millions of IOPS.",
          "Azure Arc agent integration enabling centralized cloud management for physical on-premise servers."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Hardware & Compute Sizing",
            "desc": "Calculate CPU cores, ECC RAM allocations, RAID controller parameters, and redundant NIC teaming."
          },
          {
            "phase": "Phase 2: Hyper-V Cluster Provisioning",
            "desc": "Install Windows Server Datacenter, configure Hyper-V virtual switches, and enable Cluster Shared Volumes."
          },
          {
            "phase": "Phase 3: VM Migration & Active Directory",
            "desc": "Migrate domain controllers, file servers, and application VMs into high-availability clustered storage."
          },
          {
            "phase": "Phase 4: DR Replicas & Arc Integration",
            "desc": "Establish off-site Hyper-V replica replication schedules and integrate with Azure Arc for unified monitoring."
          }
        ],
        "configPreview": {
          "type": "PowerShell Script",
          "code": "# Deploy High-Availability Hyper-V VM with Live Migration\nNew-VM -Name \"TM-APP-SRV01\" -MemoryStartupBytes 32GB -Generation 2 -NewVHDPath \"C:\\ClusterStorage\\Volume1\\TM-APP.vhdx\" -NewVHDSizeBytes 500GB\nSet-VMProcessor -VMName \"TM-APP-SRV01\" -Count 8\nAdd-ClusterVirtualMachineRole -VMName \"TM-APP-SRV01\""
        },
        "compliance": [
          "High Availability 99.99%",
          "Enterprise SLA",
          "Disaster Recovery Tested"
        ]
      },
      {
        "id": "csp-licensing-finops",
        "title": "Enterprise Cloud Solution Provider (CSP) & FinOps",
        "category": "Licensing & Financial Governance",
        "summary": "Cloud Solution Provider (CSP) licensing optimization, Microsoft Azure reserved instance planning, and automated cost monitoring to eliminate wasted expenditure.",
        "specs": [
          "Direct CSP tier licensing for Microsoft 365 E3/E5, Business Premium, and Azure consumption.",
          "Continuous license reclamation auditing to eliminate inactive or unassigned user seats.",
          "1-year and 3-year Azure Reserved Instance (RI) and Azure Savings Plan financial modeling.",
          "Consolidated monthly invoicing with granular cost-center chargeback reporting."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: License Audit & Clean-up",
            "desc": "Inspect current Microsoft tenant for over-provisioned or duplicate licenses."
          },
          {
            "phase": "Phase 2: CSP Transition",
            "desc": "Migrate licenses to Technosoft Masters CSP tier with zero downtime and preferred volume pricing."
          },
          {
            "phase": "Phase 3: Azure Workload Right-Sizing",
            "desc": "Analyze 30-day CPU/RAM utilization metrics to downsize under-utilized cloud instances."
          },
          {
            "phase": "Phase 4: Ongoing FinOps Reviews",
            "desc": "Deliver monthly cost optimization executive summaries and budget threshold alerts."
          }
        ],
        "configPreview": {
          "type": "FinOps Telemetry Schema",
          "code": "{\n  \"auditScope\": \"Microsoft CSP Enterprise\",\n  \"targetSavingsTarget\": \"35%\",\n  \"optimizationStrategies\": [\"Azure Reserved Instances\", \"Hybrid Benefit Licensing\", \"Automated Off-Hours VM Deallocation\"],\n  \"status\": \"Active Governance\"\n}"
        },
        "compliance": [
          "Canadian Tax Compliant",
          "Audit Ready",
          "Cost Controlled"
        ]
      }
    ]
  },
  "cybersecurity": {
    "badge": "Authorized Security Partner",
    "title": "SonicWall Next-Generation Firewalls & Threat Defense",
    "serviceKey": "Cybersecurity Services",
    "overview": "Delivering enterprise perimeter protection, zero-day threat defense, deep packet inspection, and resilient SD-WAN architectures powered by SonicWall Next-Generation Firewalls (NGFW).",
    "techStack": [
      "SonicWall NSa Series",
      "SonicWall TZ Series",
      "Capture ATP",
      "RTDMI Engine",
      "DPI-SSL/TLS",
      "Secure SD-WAN",
      "Zero-Trust Network Access",
      "Cloud App Security"
    ],
    "subFiles": [
      {
        "id": "sonicwall-ngfw",
        "title": "SonicWall Next-Gen Firewalls (NSa & TZ Series)",
        "category": "Perimeter & Network Security",
        "summary": "Multi-gigabit Deep Packet Inspection (DPI-SSL/TLS), Intrusion Prevention Systems (IPS), application control, and real-time perimeter threat blocking.",
        "specs": [
          "Real-time DPI-SSL inspection for encrypted HTTPS traffic without network bottlenecking.",
          "Hardware-accelerated Intrusion Prevention System (IPS) with hourly threat signature updates.",
          "Application Intelligence & Control providing granular bandwidth limits on non-business web apps.",
          "High-Availability (Active/Standby) firewall clustering with sub-second failover."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Perimeter Traffic Assessment",
            "desc": "Analyze WAN throughput, concurrent connection limits, and internal subnet segmentation needs."
          },
          {
            "phase": "Phase 2: Staged Rule Configuration",
            "desc": "Build address objects, access rules, NAT policies, and security services in SonicOS."
          },
          {
            "phase": "Phase 3: Production Gateway Cutover",
            "desc": "Install physical SonicWall appliance with zero-downtime dual-WAN failover testing."
          },
          {
            "phase": "Phase 4: 24/7 Threat Telemetry",
            "desc": "Connect firewall logs to centralized SIEM and automated anomaly alert systems."
          }
        ],
        "configPreview": {
          "type": "SonicOS CLI Command",
          "code": "# SonicOS Enterprise Security Profile Baseline\nsecurity-services\n  intrusion-prevention enable\n  gateway-antivirus enable\n  anti-spyware enable\n  cloud-av enable\n  capture-atp enable\nexit"
        },
        "compliance": [
          "ICSA Labs Certified",
          "FIPS 140-2",
          "PCI-DSS Compliant",
          "SOC 2"
        ]
      },
      {
        "id": "sonicwall-capture-atp",
        "title": "Capture ATP with Real-Time Deep Memory Inspection (RTDMI)",
        "category": "Zero-Day Threat Protection",
        "summary": "Multi-engine cloud sandboxing powered by patent-pending Real-Time Deep Memory Inspection (RTDMI) to block evasive zero-day malware and ransomware before download.",
        "specs": [
          "Real-time memory inspection catching zero-day threats that evade traditional hypervisor sandboxes.",
          "Block-Until-Verdict technology ensuring suspicious files are held until safely analyzed.",
          "Automated behavioral analysis across Windows, macOS, Android, and 300+ file extensions.",
          "Global Threat Intelligence Network sharing threat telemetry from 1M+ active sensors worldwide."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Gateway Inspection Policy",
            "desc": "Activate Capture ATP cloud sandbox integration on gateway interfaces."
          },
          {
            "phase": "Phase 2: File Extension Profiling",
            "desc": "Define strict inspect-and-hold rules for executables, archives, and Office macros."
          },
          {
            "phase": "Phase 3: Sandbox Verification",
            "desc": "Test sandbox detonation with safe simulated malware payloads to verify sub-second blocking."
          },
          {
            "phase": "Phase 4: Threat Reporting",
            "desc": "Deliver executive threat mitigation digests detailing blocked malicious vectors."
          }
        ],
        "configPreview": {
          "type": "SonicOS ATP Policy",
          "code": "# Configure Capture ATP Block-Until-Verdict\ncapture-atp\n  enable\n  block-until-verdict enable\n  cloud-service global-best-latency\n  file-types include-all-executables-and-documents\nexit"
        },
        "compliance": [
          "Zero-Day SLA",
          "Anti-Ransomware Shield",
          "NIST CSF"
        ]
      },
      {
        "id": "sonicwall-sd-wan",
        "title": "Secure SD-WAN & Site-to-Site Encrypted Mesh",
        "category": "Branch Networking & Telephony",
        "summary": "Dynamic path selection, sub-second WAN failover, and high-performance IPsec encrypted VPN tunnels connecting corporate branches, retail stores, and remote staff.",
        "specs": [
          "Dynamic SLA-based path selection monitoring latency, jitter, and packet loss in real time.",
          "Sub-second automated dual-WAN failover maintaining uninterrupted VoIP and video calls.",
          "AES-256 encrypted site-to-site VPN mesh connecting remote branch offices securely.",
          "Seamless broadband, fiber, and 5G cellular failover integration."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: WAN Topology Design",
            "desc": "Determine primary fiber, secondary broadband, and LTE/5G emergency circuits."
          },
          {
            "phase": "Phase 2: Dynamic SD-WAN SLA Rules",
            "desc": "Configure latency thresholds (<30ms) for VoIP and mission-critical cloud traffic."
          },
          {
            "phase": "Phase 3: IPsec Mesh Deployment",
            "desc": "Establish automated site-to-site mesh tunnels between headquarters and branches."
          },
          {
            "phase": "Phase 4: Failover Simulation",
            "desc": "Perform physical cable pull tests to verify seamless live circuit switching without dropped calls."
          }
        ],
        "configPreview": {
          "type": "SonicOS SD-WAN Rule",
          "code": "# Deploy Dynamic Secure SD-WAN Path Selection\nsd-wan\n  sla-class \"VoIP-Priority\" latency 30 jitter 10 packet-loss 1\n  path-selection \"WAN-Primary\" fallback \"WAN-Secondary\"\nexit"
        },
        "compliance": [
          "99.999% Branch Uptime",
          "FIPS 140-3",
          "PCI-DSS Network"
        ]
      },
      {
        "id": "sonicwall-ztna",
        "title": "Zero-Trust Network Access (ZTNA) & SMA Gateways",
        "category": "Remote Access Security",
        "summary": "Secure Mobile Access (SMA) gateways providing granular per-application remote access, biometric MFA, and endpoint compliance verification for remote staff.",
        "specs": [
          "Clientless HTML5 browser access to internal corporate web apps, RDP desktops, and file shares.",
          "Continuous endpoint posture checking (antivirus status, OS patch level, domain membership).",
          "Granular per-application micro-segmentation preventing lateral network movement.",
          "Single sign-on (SSO) integration with Microsoft Entra ID and Google Workspace."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Remote Access Mapping",
            "desc": "Catalog remote workforce applications, RDP endpoints, and security clearance levels."
          },
          {
            "phase": "Phase 2: SMA Gateway Setup",
            "desc": "Deploy physical or virtual SMA appliance with TLS 1.3 encrypted portal."
          },
          {
            "phase": "Phase 3: Device Posture Enactment",
            "desc": "Require corporate endpoint verification before granting internal network access."
          },
          {
            "phase": "Phase 4: Audit & Log Aggregation",
            "desc": "Monitor active user sessions and automatically terminate anomalous access attempts."
          }
        ],
        "configPreview": {
          "type": "ZTNA Policy Profile",
          "code": "{\n  \"gateway\": \"SMA-ZeroTrust-Primary\",\n  \"accessPolicy\": \"Per-App-Least-Privilege\",\n  \"deviceVerification\": { \"bitlocker\": true, \"edrRunning\": true, \"osVersion\": \">=Windows 11\" },\n  \"sessionTimeout\": 28800\n}"
        },
        "compliance": [
          "Zero-Trust Architecture",
          "CISA ZTMM",
          "HIPAA Remote"
        ]
      },
      {
        "id": "sonicwall-cloud-app-security",
        "title": "SonicWall Cloud App Security (CAS) & SaaS Defense",
        "category": "Cloud Application Security",
        "summary": "API-based security and DLP protection for Microsoft 365, Google Workspace, and enterprise SaaS cloud tools against credential theft, malicious file sharing, and phishing.",
        "specs": [
          "API-driven inline scanning for incoming, outgoing, and internal Microsoft 365 emails.",
          "Cloud Data Loss Prevention (DLP) detecting sensitive credit cards, SIN numbers, and confidential files.",
          "Shadow IT discovery identifying unauthorized SaaS tools used across corporate devices.",
          "Automated account takeover protection detecting suspicious login geolocations."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Cloud Tenant API Connection",
            "desc": "Grant secure OAuth2 API permissions to Microsoft 365 or Google Workspace tenant."
          },
          {
            "phase": "Phase 2: DLP Policy Definition",
            "desc": "Configure compliance filters for financial data, personal health information, and trade secrets."
          },
          {
            "phase": "Phase 3: Shadow IT Scan",
            "desc": "Identify unmanaged cloud storage and unauthorized web applications."
          },
          {
            "phase": "Phase 4: Automated Incident Response",
            "desc": "Set automated rules to quarantine phishing emails and revoke compromised user tokens."
          }
        ],
        "configPreview": {
          "type": "CAS Policy Engine",
          "code": "# Enforce Cloud SaaS DLP & Quarantine\ncloud-app-security\n  target \"Microsoft 365 Tenant\"\n  dlp-policy \"Block-Sensitive-SIN-and-Financial\" action quarantine\n  anti-phishing sensitivity high\nexit"
        },
        "compliance": [
          "PIPEDA",
          "SOC 2 Type II",
          "GDPR Cloud"
        ]
      }
    ]
  },
  "infrastructure": {
    "badge": "Hardware & Datacenter Infrastructure",
    "title": "Multi-Vendor Enterprise Infrastructure & Server Racks",
    "serviceKey": "Infrastructure Services",
    "overview": "Comprehensive physical and logical infrastructure deployment across Cisco, Dell, structured cabling, 42U server rack installations, and mission-critical server closet environments.",
    "techStack": [
      "Cisco Catalyst",
      "Dell PowerSwitch",
      "42U Server Racks",
      "Cat6A Shielded",
      "Single/Multi-Mode Fiber",
      "APC Smart-UPS",
      "Patch Panels"
    ],
    "subFiles": [
      {
        "id": "server-rack-cabling",
        "title": "42U Server Rack Installation & Structured Fiber Cabling",
        "category": "Physical Infrastructure & Datacenter",
        "summary": "Precision server mounting, managed PDU power distribution, APC UPS battery backup installations, color-coded Cat6A cabling, and fiber optic terminations.",
        "specs": [
          "Precision 42U rack layout with hot/cold aisle thermal airflow containment.",
          "Managed PDU power distribution with per-outlet remote power-cycling capabilities.",
          "APC Smart-UPS backup power with automated graceful virtual machine shutdown scripts.",
          "Fluke DSX-8000 certified Cat6A and multi-mode OM4 fiber terminations."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Rack Elevation Blueprint",
            "desc": "Draft detailed U-by-U equipment elevations, weight distributions, and thermal dissipation metrics."
          },
          {
            "phase": "Phase 2: Physical Mount & Cable Dressing",
            "desc": "Mount rails, servers, and switches with color-coded horizontal cable managers."
          },
          {
            "phase": "Phase 3: Termination & Certification",
            "desc": "Terminate patch panels and test all drops with Fluke certifiers for 10Gbps pass ratings."
          },
          {
            "phase": "Phase 4: Power Redundancy Testing",
            "desc": "Conduct live UPS load tests and automatic transfer switch (ATS) power cut simulations."
          }
        ],
        "configPreview": {
          "type": "Datacenter Rack Specification",
          "code": "# 42U Enterprise Rack Allocation Blueprint\nU40-U42: 10G/40G Fiber Patch Panels & Distribution Switches\nU38-U39: Cisco / Aruba Core Switch Stack (VSF / Virtual Chassis)\nU20-U36: Clustered Virtualization Hypervisors & All-Flash Storage (SAN)\nU01-U04: Dual Redundant 3000VA APC Smart-UPS Battery Arrays"
        },
        "compliance": [
          "TIA-942 Datacenter Standard",
          "Fluke Certified",
          "ISO/IEC 11801"
        ]
      }
    ]
  },
  "digital-transformation": {
    "badge": "Enterprise Architecture & Cloud Systems",
    "title": "Modern IT Architecture & High-Availability Infrastructure",
    "serviceKey": "IT Solutions",
    "overview": "Technosoft Masters Inc. designs and deploys next-generation modern IT architectures that unify cloud ecosystems, on-premise compute infrastructure, zero-trust cybersecurity, and automated data pipelines for maximum enterprise scalability, reliability, and security.",
    "techStack": [
      "Hybrid Cloud",
      "Microsoft Azure / AWS",
      "Hyper-V / VMware Clusters",
      "10G/40G Fiber Fabrics",
      "Zero-Trust IAM",
      "Microsoft Intune",
      "Disaster Recovery (BCDR)",
      "24/7 Telemetry"
    ],
    "subFiles": [
      {
        "id": "hybrid-compute",
        "title": "Hybrid Cloud & Multi-Tier Compute Infrastructure",
        "category": "Compute & Infrastructure",
        "summary": "High-availability virtualized server clusters, cloud-native microservices, automated load balancing, and sub-millisecond network peering.",
        "specs": [
          "Active-Active clustered virtualization environments with automated instant failover.",
          "Microservices containerization using Docker and Kubernetes orchestration.",
          "Sub-millisecond hybrid cloud interconnects bridging on-premise hardware to Azure/AWS.",
          "Automated compute resource re-balancing during peak business operational hours."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Compute & IOPS Profiling",
            "desc": "Evaluate CPU workload peaks, RAM saturation, and disk read/write throughput."
          },
          {
            "phase": "Phase 2: Redundant Cluster Deployment",
            "desc": "Build clustered server nodes with dual-path redundant power and network teaming."
          },
          {
            "phase": "Phase 3: Workload Containerization",
            "desc": "Migrate monolithic legacy applications into decoupled, resilient container services."
          },
          {
            "phase": "Phase 4: Automated Failover Drills",
            "desc": "Simulate node hardware crashes to guarantee continuous zero-drop application availability."
          }
        ],
        "configPreview": {
          "type": "Architecture Cluster Config",
          "code": "# High-Availability Compute Cluster Specification\ncluster_definition:\n  nodes: 4\n  cpu_cores: 128\n  memory_total: 1024GB\n  storage_tier: \"NVMe All-Flash S2D\"\n  failover_policy: \"Automated-Zero-Downtime\"\n  hybrid_cloud_peer: \"Azure-Canada-Central\""
        },
        "compliance": [
          "99.999% SLA",
          "Fault-Tolerant Design",
          "Enterprise Scalability"
        ]
      },
      {
        "id": "bcdr-disaster-recovery",
        "title": "Disaster Recovery & Business Continuity (BCDR)",
        "category": "Resilience & Recovery",
        "summary": "Automated off-site replication, immutable ransomware-proof cloud snapshots, sub-15-minute Recovery Time Objectives (RTO), and guaranteed zero data loss.",
        "specs": [
          "Immutable WORM cloud repositories preventing ransomware encryption or tampering.",
          "Sub-15-minute Recovery Time Objective (RTO) with instantaneous cloud virtual machine boot.",
          "Automated daily backup boot-test verification with screenshot validation logs.",
          "Comprehensive disaster recovery runbooks and semi-annual simulated recovery drills."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: RTO/RPO Objective Definition",
            "desc": "Establish maximum allowable data loss (RPO) and downtime (RTO) thresholds with business stakeholders."
          },
          {
            "phase": "Phase 2: Immutable Storage Staging",
            "desc": "Provision encrypted, air-gapped off-site cloud storage with Write-Once-Read-Many policies."
          },
          {
            "phase": "Phase 3: Continuous Snapshot Automation",
            "desc": "Configure hourly block-level differential snapshots across all critical database and app servers."
          },
          {
            "phase": "Phase 4: Disaster Recovery Drill",
            "desc": "Spin up complete virtualized corporate infrastructure in the cloud within 15 minutes."
          }
        ],
        "configPreview": {
          "type": "BCDR Policy Blueprint",
          "code": "{\n  \"backupEngine\": \"Immutable-Cloud-BCDR\",\n  \"targetRTO\": \"15 Minutes\",\n  \"targetRPO\": \"1 Hour\",\n  \"storageType\": \"Geo-Redundant-WORM-Encrypted\",\n  \"verificationSchedule\": \"Daily-Automated-Boot-Test\"\n}"
        },
        "compliance": [
          "ISO 22301 Business Continuity",
          "SOC 2 Type II",
          "PIPEDA"
        ]
      }
    ]
  },
  "technology-consulting": {
    "badge": "Corporate Strategy & Philosophy",
    "title": "Innovate \u2022 Automate \u2022 Elevate \u2014 The Technosoft Masters Standard",
    "serviceKey": "Technology Consulting",
    "overview": "Technosoft Masters Inc. is driven by a three-pillar methodology designed to give Canadian and North American enterprises an unfair technical and operational advantage.",
    "techStack": [
      "Cloud Native",
      "Workflow RPA",
      "Zero-Trust Security",
      "Intelligent AI",
      "Continuous SLA Monitoring"
    ],
    "subFiles": [
      {
        "id": "innovate-pillar",
        "title": "INNOVATE: Future-Proof Technology Architectures",
        "category": "Core Philosophy",
        "summary": "Adopting next-generation cloud infrastructure, containerized microservices, and AI models before competitors even realize they exist.",
        "specs": [
          "Building modular, scalable architectures engineered for effortless 10x growth.",
          "Eliminating technical debt through clean, typed codebases and automated testing.",
          "Continuous adoption of cutting-edge hardware and cloud breakthroughs."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Technology Horizon Scanning",
            "desc": "Continuously evaluate emerging tech frameworks and enterprise platforms."
          },
          {
            "phase": "Phase 2: Proof of Concept (PoC) Testing",
            "desc": "Validate new tools in controlled sandbox environments before enterprise recommendation."
          },
          {
            "phase": "Phase 3: Production Hardening",
            "desc": "Integrate vetted technologies into client environments with comprehensive documentation."
          },
          {
            "phase": "Phase 4: Client Competitive Advantage",
            "desc": "Accelerate client time-to-market and operational throughput."
          }
        ],
        "configPreview": {
          "type": "Strategic Principle",
          "code": "# Core Principle: INNOVATE\nAlways architect for tomorrow's scale while delivering immediate business value today.\nEliminate legacy friction. Build with resilience."
        },
        "compliance": [
          "Future-Proof",
          "Zero-Debt Engineering"
        ]
      }
    ]
  },
  "network-operations": {
    "badge": "Enterprise Wireless & Switching",
    "title": "Ubiquiti UniFi Enterprise Network Infrastructure",
    "serviceKey": "Network Operations Services",
    "overview": "End-to-end design, installation, and multi-site cloud management for Ubiquiti UniFi ecosystems\u2014delivering seamless enterprise WiFi 6/7, high-density PoE+ switching, and centralized console governance.",
    "techStack": [
      "UniFi WiFi 7",
      "UniFi UDM-Pro / SE",
      "Enterprise PoE+ Switches",
      "UniFi OS",
      "VLAN Segmentation",
      "Site-to-Site WireGuard",
      "Captive Portals",
      "24/7 Cloud NOC"
    ],
    "subFiles": [
      {
        "id": "unifi-wifi-7",
        "title": "UniFi WiFi 6 & WiFi 7 Enterprise Access Points",
        "category": "High-Density Wireless",
        "summary": "Deployment of U6-Enterprise and U7-Pro access points with high-density RF channel mapping, 6GHz band support, beamforming, and seamless fast roaming (802.11r/k/v).",
        "specs": [
          "Tri-band WiFi 7 with 6GHz spectrum delivering multi-gigabit wireless throughput.",
          "Seamless 802.11r/k/v fast BSS transition for zero-drop VoIP and video roaming across buildings.",
          "Automated RF channel optimization and AI interference avoidance.",
          "High client density supporting 500+ concurrent devices per access point."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Predictive RF Heatmap Survey",
            "desc": "Map building floor plans, wall attenuation materials, and client density zones."
          },
          {
            "phase": "Phase 2: Structured AP Placement",
            "desc": "Mount enterprise access points with Cat6A shielded drops and PoE+ power budgeting."
          },
          {
            "phase": "Phase 3: Frequency Tuning & Roaming",
            "desc": "Configure non-overlapping 20/40/80/160MHz channels and minimum RSSI thresholds."
          },
          {
            "phase": "Phase 4: Live Client Stress Test",
            "desc": "Walk building perimeter with spectrum analyzers to verify seamless roaming handoffs."
          }
        ],
        "configPreview": {
          "type": "UniFi Controller Config",
          "code": "# Enterprise WiFi 7 SSID Profile\nwlan_profile {\n  name = \"TM-Corp-WiFi7\"\n  security = \"WPA3-Enterprise\"\n  bands = [\"2.4GHz\", \"5GHz\", \"6GHz\"]\n  fast_roaming = true\n  band_steering = \"prefer_5g_6g\"\n}"
        },
        "compliance": [
          "Wi-Fi Alliance Certified",
          "WPA3 Enterprise",
          "Enterprise QoS"
        ]
      },
      {
        "id": "unifi-udm-gateways",
        "title": "UniFi Dream Machines (UDM Pro / SE) & 10G Routing",
        "category": "Enterprise Routing & Gateway",
        "summary": "10G SFP+ WAN routing, integrated intrusion prevention (IPS/IDS), automated dual-WAN failover, and high-speed UniFi OS console.",
        "specs": [
          "3.5+ Gbps routing throughput with full DPI and IPS/IDS security active.",
          "Dual-WAN failover and load balancing supporting multi-gigabit fiber connections.",
          "Integrated UniFi OS hosting Network, Protect, Access, and Talk applications.",
          "Hardware redundant power supply (UniFi SmartPower RPS) support."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: ISP Circuit Integration",
            "desc": "Configure static IP allocations, SFP+ 10G transceivers, and primary/secondary WANs."
          },
          {
            "phase": "Phase 2: Subnet & VLAN Mapping",
            "desc": "Build separate networks for Management, Corporate, VoIP, CCTV, and Guest traffic."
          },
          {
            "phase": "Phase 3: Security & Firewall Rules",
            "desc": "Enable Category 5 IPS/IDS inspection and inter-VLAN blocking rules."
          },
          {
            "phase": "Phase 4: Cloud Console Link",
            "desc": "Connect gateway to Technosoft Masters multi-tenant 24/7 cloud monitoring."
          }
        ],
        "configPreview": {
          "type": "UniFi Gateway Policy",
          "code": "# Configure 10G SFP+ Dual-WAN Failover\nwan_settings {\n  port_9 = \"10G SFP+ Primary Bell Fiber\"\n  port_10 = \"2.5G RJ45 Secondary Rogers Cable\"\n  mode = \"failover_only\"\n  ping_target = \"1.1.1.1\"\n  failover_delay_seconds = 2\n}"
        },
        "compliance": [
          "10G Ready",
          "Enterprise IPS/IDS",
          "99.99% Routing SLA"
        ]
      },
      {
        "id": "unifi-poe-switches",
        "title": "UniFi Managed PoE+ & Pro/Enterprise Switch Fabrics",
        "category": "Switching Infrastructure",
        "summary": "Multi-gigabit 2.5G/10G switches, Layer 3 routing, VLAN segmentation, and PoE power budget optimization for VoIP phones, APs, and security cameras.",
        "specs": [
          "Layer 3 switching features: inter-VLAN routing, static routing, and DHCP server relay.",
          "PoE++ (802.3bt) delivering up to 60W per port for high-draw PTZ cameras and WiFi 7 APs.",
          "10G/25G SFP28 optical uplink aggregation between distribution and core racks.",
          "Per-port bandwidth limiting, 802.1X radius authentication, and loop prevention (STP/RSTP)."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Port Density & Wattage Audit",
            "desc": "Calculate total PoE wattage requirements and port counts across all building IDF closets."
          },
          {
            "phase": "Phase 2: Rack Mounting & Fiber Links",
            "desc": "Install switches in 42U racks with clean color-coded slim patch cables."
          },
          {
            "phase": "Phase 3: Port Profile Assignment",
            "desc": "Tag specific VLANs to corporate desks, access points, and surveillance cameras."
          },
          {
            "phase": "Phase 4: Loop & Spanning Tree Verification",
            "desc": "Verify RSTP root bridge priority to prevent network broadcast storms."
          }
        ],
        "configPreview": {
          "type": "UniFi Switch Port Profile",
          "code": "# Enterprise PoE+ Port Profile Config\nport_profile {\n  name = \"AP-Trunk-Profile\"\n  native_network = \"Management-VLAN-10\"\n  tagged_networks = [\"Corporate-20\", \"VoIP-30\", \"Guest-40\"]\n  poe_mode = \"auto_poe_plus\"\n  stp_state = \"enabled\"\n}"
        },
        "compliance": [
          "IEEE 802.3bt PoE++",
          "Energy Efficient Ethernet",
          "Layer 3 Wire-Speed"
        ]
      }
    ]
  },
  "managed-it": {
    "badge": "Central Command & Architecture Matrix",
    "title": "Technosoft Masters Core Architecture Matrix (24/7/365)",
    "serviceKey": "Managed IT & Infrastructure",
    "overview": "A unified command architecture overseeing high-availability IT infrastructure, real-time security monitoring, and automated enterprise workflows from Mississauga Headquarters.",
    "techStack": [
      "24/7 Telemetry NOC",
      "Active Directory / Entra ID",
      "Next-Gen Firewalls",
      "Cloud Orchestration",
      "Automated Failover",
      "Emergency Field SLA"
    ],
    "subFiles": [
      {
        "id": "telemetry-command",
        "title": "24/7/365 Real-Time Telemetry & Systems Health Monitoring",
        "category": "Continuous Operations",
        "summary": "Proactive monitoring across servers, switches, cloud instances, and database pipelines with sub-second automated alert dispatch.",
        "specs": [
          "Continuous heartbeat monitoring across CPU, RAM, disk latency, and network throughput.",
          "Automated self-healing triggers restarting failed microservices before users detect an issue.",
          "Dedicated Mississauga engineering dispatch for mission-critical on-site hardware replacements.",
          "Guaranteed 15-minute emergency response SLA."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Telemetry Sensor Deployment",
            "desc": "Install monitoring agents on all physical and cloud endpoints."
          },
          {
            "phase": "Phase 2: Threshold Tuning",
            "desc": "Establish statistical baseline anomaly thresholds to eliminate false positives."
          },
          {
            "phase": "Phase 3: Automated Incident Escalation",
            "desc": "Configure automated SMS, call, and ticket escalation trees to senior engineers."
          },
          {
            "phase": "Phase 4: Monthly Executive SLA Reports",
            "desc": "Deliver uptime metrics, patch compliance summaries, and capacity planning forecasts."
          }
        ],
        "configPreview": {
          "type": "NOC Telemetry Metric",
          "code": "{\n  \"monitoringEngine\": \"TM-Enterprise-NOC\",\n  \"uptimeTarget\": \"99.99%\",\n  \"pollingInterval\": \"15s\",\n  \"escalationTree\": [\"L1 Automated Self-Healing\", \"L2 Senior Systems Engineer\", \"L3 Field Dispatch\"]\n}"
        },
        "compliance": [
          "24/7/365 Active",
          "Guaranteed SLA",
          "Mississauga HQ Based"
        ]
      }
    ]
  },
  "backup-recovery": {
    "badge": "Enterprise Architecture & Cloud Systems",
    "title": "Modern IT Architecture & High-Availability Infrastructure",
    "serviceKey": "IT Solutions",
    "overview": "Technosoft Masters Inc. designs and deploys next-generation modern IT architectures that unify cloud ecosystems, on-premise compute infrastructure, zero-trust cybersecurity, and automated data pipelines for maximum enterprise scalability, reliability, and security.",
    "techStack": [
      "Hybrid Cloud",
      "Microsoft Azure / AWS",
      "Hyper-V / VMware Clusters",
      "10G/40G Fiber Fabrics",
      "Zero-Trust IAM",
      "Microsoft Intune",
      "Disaster Recovery (BCDR)",
      "24/7 Telemetry"
    ],
    "subFiles": [
      {
        "id": "hybrid-compute",
        "title": "Hybrid Cloud & Multi-Tier Compute Infrastructure",
        "category": "Compute & Infrastructure",
        "summary": "High-availability virtualized server clusters, cloud-native microservices, automated load balancing, and sub-millisecond network peering.",
        "specs": [
          "Active-Active clustered virtualization environments with automated instant failover.",
          "Microservices containerization using Docker and Kubernetes orchestration.",
          "Sub-millisecond hybrid cloud interconnects bridging on-premise hardware to Azure/AWS.",
          "Automated compute resource re-balancing during peak business operational hours."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: Compute & IOPS Profiling",
            "desc": "Evaluate CPU workload peaks, RAM saturation, and disk read/write throughput."
          },
          {
            "phase": "Phase 2: Redundant Cluster Deployment",
            "desc": "Build clustered server nodes with dual-path redundant power and network teaming."
          },
          {
            "phase": "Phase 3: Workload Containerization",
            "desc": "Migrate monolithic legacy applications into decoupled, resilient container services."
          },
          {
            "phase": "Phase 4: Automated Failover Drills",
            "desc": "Simulate node hardware crashes to guarantee continuous zero-drop application availability."
          }
        ],
        "configPreview": {
          "type": "Architecture Cluster Config",
          "code": "# High-Availability Compute Cluster Specification\ncluster_definition:\n  nodes: 4\n  cpu_cores: 128\n  memory_total: 1024GB\n  storage_tier: \"NVMe All-Flash S2D\"\n  failover_policy: \"Automated-Zero-Downtime\"\n  hybrid_cloud_peer: \"Azure-Canada-Central\""
        },
        "compliance": [
          "99.999% SLA",
          "Fault-Tolerant Design",
          "Enterprise Scalability"
        ]
      },
      {
        "id": "bcdr-disaster-recovery",
        "title": "Disaster Recovery & Business Continuity (BCDR)",
        "category": "Resilience & Recovery",
        "summary": "Automated off-site replication, immutable ransomware-proof cloud snapshots, sub-15-minute Recovery Time Objectives (RTO), and guaranteed zero data loss.",
        "specs": [
          "Immutable WORM cloud repositories preventing ransomware encryption or tampering.",
          "Sub-15-minute Recovery Time Objective (RTO) with instantaneous cloud virtual machine boot.",
          "Automated daily backup boot-test verification with screenshot validation logs.",
          "Comprehensive disaster recovery runbooks and semi-annual simulated recovery drills."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: RTO/RPO Objective Definition",
            "desc": "Establish maximum allowable data loss (RPO) and downtime (RTO) thresholds with business stakeholders."
          },
          {
            "phase": "Phase 2: Immutable Storage Staging",
            "desc": "Provision encrypted, air-gapped off-site cloud storage with Write-Once-Read-Many policies."
          },
          {
            "phase": "Phase 3: Continuous Snapshot Automation",
            "desc": "Configure hourly block-level differential snapshots across all critical database and app servers."
          },
          {
            "phase": "Phase 4: Disaster Recovery Drill",
            "desc": "Spin up complete virtualized corporate infrastructure in the cloud within 15 minutes."
          }
        ],
        "configPreview": {
          "type": "BCDR Policy Blueprint",
          "code": "{\n  \"backupEngine\": \"Immutable-Cloud-BCDR\",\n  \"targetRTO\": \"15 Minutes\",\n  \"targetRPO\": \"1 Hour\",\n  \"storageType\": \"Geo-Redundant-WORM-Encrypted\",\n  \"verificationSchedule\": \"Daily-Automated-Boot-Test\"\n}"
        },
        "compliance": [
          "ISO 22301 Business Continuity",
          "SOC 2 Type II",
          "PIPEDA"
        ]
      }
    ]
  },
  "website-services": {
    "badge": "Enterprise Technology Suite",
    "title": "Software, Web Applications & Custom Portals",
    "serviceKey": "Software & Web Solutions",
    "overview": "High-performance web applications, corporate client portals, internal management tools, and custom software systems built with modern, secure frameworks.",
    "techStack": [
      "React / Next.js",
      "Node.js / Express",
      "Python / FastAPI",
      "PostgreSQL / MongoDB",
      "GraphQL / REST APIs",
      "Docker / Kubernetes",
      "Tailwind CSS"
    ],
    "subFiles": [
      {
        "id": "custom-web-apps",
        "title": "Full-Stack Custom Web Applications & Portals",
        "category": "Custom Software Engineering",
        "summary": "Bespoke web applications and customer portals engineered with responsive UI/UX, microservices architecture, and sub-second database queries.",
        "specs": [
          "High-performance frontend built with modern React / Vue and server-side rendering for instant page transitions.",
          "Secure user authentication with JWT tokens, OAuth2, and role-based permissions.",
          "Scalable microservices backend designed for high concurrent user loads.",
          "Automated CI/CD deployment pipelines with zero-downtime rolling updates."
        ],
        "lifecycle": [
          {
            "phase": "Phase 1: UI/UX Wireframing & Scope",
            "desc": "Create interactive Figma prototypes, database entity relationship diagrams, and API contracts."
          },
          {
            "phase": "Phase 2: Full-Stack Engineering",
            "desc": "Develop responsive frontend components and secure RESTful/GraphQL backend services."
          },
          {
            "phase": "Phase 3: Automated QA & Security Auditing",
            "desc": "Conduct unit testing, end-to-end integration tests, and OWASP Top 10 penetration testing."
          },
          {
            "phase": "Phase 4: Cloud Production Launch",
            "desc": "Deploy to containerized cloud clusters with automated SSL certificates and CDN caching."
          }
        ],
        "configPreview": {
          "type": "TypeScript / React Component",
          "code": "// Enterprise Portal Data Grid Component\nexport const EnterprisePortalGrid = ({ records }: { records: DataRecord[] }) => {\n  return (\n    <div className=\"portal-glass-container\">\n      <DashboardHeader title=\"Live Operations Telemetry\" />\n      <DataTable data={records} onAction={handleSecureAction} />\n    </div>\n  );\n};"
        },
        "compliance": [
          "OWASP Top 10 Protected",
          "WCAG 2.1 AA Accessible",
          "SOC 2 Ready"
        ]
      }
    ]
  }
};

  const detailModal = document.getElementById('detail-modal');
  const modalContentWrap = document.getElementById('modal-content-wrap');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  // Helper: Scroll to contact form with pre-filled inquiry parameters
  function scrollToContactWithPreFill(serviceKey, note) {
    closeDetailModal();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const headerOffset = 80;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      if (serviceKey) {
        const formService = document.getElementById('form-service');
        if (formService) {
          for (let i = 0; i < formService.options.length; i++) {
            if (formService.options[i].value === serviceKey) {
              formService.selectedIndex = i;
              break;
            }
          }
        }
      }

      const formMessage = document.getElementById('form-message');
      if (formMessage && note) {
        formMessage.value = note;
      }

      setTimeout(() => {
        const formName = document.getElementById('form-name');
        if (formName) formName.focus();
        const formCard = document.querySelector('.contact-form-card');
        if (formCard) {
          formCard.style.boxShadow = '0 0 40px rgba(0, 210, 255, 0.6), 0 0 25px rgba(245, 158, 11, 0.4)';
          setTimeout(() => { formCard.style.boxShadow = ''; }, 1800);
        }
      }, 600);
    }
  }

  // LEVEL 2: Main Solution Overview & Sub-Files Index
  function openDetailModal(key) {
    const data = modalDatabase[key];
    if (!data || !detailModal || !modalContentWrap) return;

    let subFilesHtml = '';
    if (data.subFiles && data.subFiles.length) {
      subFilesHtml = `
        <div class="modal-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          <span>Architecture Modules & Deep Sub-Files (Click any to open deep breakdown)</span>
        </div>
        <div class="modal-subfiles-grid">
          ${data.subFiles
            .map(
              (sub, idx) => `
            <div class="modal-subfile-card" data-parent-key="${key}" data-sub-idx="${idx}" tabindex="0" role="button" title="Click to open full file: ${sub.title}">
              <div class="subfile-top-row">
                <span class="subfile-badge">${sub.category}</span>
                <span class="subfile-num">FILE 0${idx + 1}</span>
              </div>
              <h3 class="subfile-title">${sub.title}</h3>
              <p class="subfile-summary">${sub.summary}</p>
              <div class="subfile-explore-cta">
                <span>▶ Open Deep Technical Breakdown & Files</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </div>
            </div>
          `
            )
            .join('')}
        </div>
      `;
    }

    let techStackHtml = '';
    if (data.techStack && data.techStack.length) {
      techStackHtml = `
        <div class="modal-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00d2ff" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2"></rect><rect x="2" y="14" width="20" height="8" rx="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
          <span>Technology & Architecture Stack</span>
        </div>
        <div class="modal-tech-stack-row">
          ${data.techStack
            .map(
              (t) => `<button type="button" class="modal-tech-pill" title="Inquire about ${t}">✦ ${t}</button>`
            )
            .join('')}
        </div>
      `;
    }

    modalContentWrap.innerHTML = `
      <div class="modal-breadcrumb-bar">
        <span class="breadcrumb-item active">Overview</span>
        <span class="breadcrumb-sep">/</span>
        <span class="breadcrumb-item">${data.title}</span>
      </div>

      <div class="modal-header-badge">
        <span class="partners-badge-dot"></span>
        <span>${data.badge}</span>
      </div>
      <h2 class="modal-title">${data.title}</h2>
      <p class="modal-overview">${data.overview}</p>
      
      ${subFilesHtml}
      ${techStackHtml}

      <div class="modal-actions-bar">
        <button class="btn btn-gold modal-inquire-btn" data-service-select="${data.serviceKey || ''}">
          <span>Inquire About This Service</span>
          <span class="btn-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </span>
        </button>
        <button class="btn btn-secondary modal-close-action-btn">
          <span>Close Window</span>
        </button>
      </div>
    `;

    modalContentWrap.scrollTop = 0;
    detailModal.classList.add('is-active');
    detailModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Inquire Button Click
    const modalInquireBtn = modalContentWrap.querySelector('.modal-inquire-btn');
    if (modalInquireBtn) {
      modalInquireBtn.addEventListener('click', function () {
        const serviceToSelect = this.getAttribute('data-service-select');
        scrollToContactWithPreFill(serviceToSelect, `Hello Technosoft Masters, I am inquiring about your comprehensive solution: ${data.title}`);
      });
    }

    // Sub-File Drilldown Trigger Click
    modalContentWrap.querySelectorAll('.modal-subfile-card').forEach((card) => {
      card.addEventListener('click', function () {
        const parentKey = this.getAttribute('data-parent-key');
        const subIdx = parseInt(this.getAttribute('data-sub-idx'), 10);
        openSubDetailModal(parentKey, subIdx);
      });

      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });

    // Tech Pills Direct Inquiry
    modalContentWrap.querySelectorAll('.modal-tech-pill').forEach((pill) => {
      pill.addEventListener('click', function () {
        const techName = this.textContent.replace('✦', '').trim();
        scrollToContactWithPreFill(data.serviceKey, `Hello Technosoft Masters, I would like to inquire about integrating: ${techName} under ${data.title}`);
      });
    });

    // Close Button
    const modalCloseActionBtn = modalContentWrap.querySelector('.modal-close-action-btn');
    if (modalCloseActionBtn) {
      modalCloseActionBtn.addEventListener('click', closeDetailModal);
    }
  }

  // LEVEL 3: Deep Technical Breakdown & Sub-File View
  function openSubDetailModal(parentKey, subIdx) {
    const parentData = modalDatabase[parentKey];
    if (!parentData || !parentData.subFiles || !parentData.subFiles[subIdx]) return;

    const sub = parentData.subFiles[subIdx];

    let specsHtml = '';
    if (sub.specs && sub.specs.length) {
      specsHtml = `
        <div class="modal-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Technical Deliverables & Enterprise Parameters</span>
        </div>
        <div class="drilldown-specs-list">
          ${sub.specs
            .map(
              (spec) => `
            <div class="drilldown-spec-item">
              <div class="spec-check-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <span>${spec}</span>
            </div>
          `
            )
            .join('')}
        </div>
      `;
    }

    let lifecycleHtml = '';
    if (sub.lifecycle && sub.lifecycle.length) {
      lifecycleHtml = `
        <div class="modal-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          <span>4-Phase Implementation & Deployment Lifecycle</span>
        </div>
        <div class="drilldown-lifecycle-grid">
          ${sub.lifecycle
            .map(
              (step, sIdx) => `
            <div class="lifecycle-step-card">
              <div class="lifecycle-step-num">0${sIdx + 1}</div>
              <h4 class="lifecycle-step-title">${step.phase}</h4>
              <p class="lifecycle-step-desc">${step.desc}</p>
            </div>
          `
            )
            .join('')}
        </div>
      `;
    }

    let configPreviewHtml = '';
    if (sub.configPreview) {
      configPreviewHtml = `
        <div class="modal-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00d2ff" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
          <span>Live Architecture / Configuration Blueprint Preview (${sub.configPreview.type})</span>
        </div>
        <div class="drilldown-code-box">
          <div class="code-box-header">
            <div class="code-dots">
              <span class="code-dot red"></span>
              <span class="code-dot yellow"></span>
              <span class="code-dot green"></span>
            </div>
            <span class="code-lang-label">${sub.configPreview.type}</span>
          </div>
          <pre class="code-block"><code>${sub.configPreview.code.replace(/\n/g, '\n')}</code></pre>
        </div>
      `;
    }

    let complianceHtml = '';
    if (sub.compliance && sub.compliance.length) {
      complianceHtml = `
        <div class="drilldown-compliance-row">
          <span class="compliance-title">Compliance & Verification Standards:</span>
          ${sub.compliance.map((c) => `<span class="compliance-tag">🛡 ${c}</span>`).join('')}
        </div>
      `;
    }

    // Other Sub-Files Quick Switcher
    let siblingFilesHtml = '';
    if (parentData.subFiles.length > 1) {
      siblingFilesHtml = `
        <div class="modal-section-title" style="margin-top: 26px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00d2ff" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
          <span>Related Files in this Solution (${parentData.subFiles.length} files available):</span>
        </div>
        <div class="sibling-files-row">
          ${parentData.subFiles
            .map(
              (sib, sibIdx) => `
            <button type="button" class="sibling-file-btn ${sibIdx === subIdx ? 'active' : ''}" data-parent-key="${parentKey}" data-sub-idx="${sibIdx}">
              ${sibIdx === subIdx ? '▶ ' : ''}${sib.title}
            </button>
          `
            )
            .join('')}
        </div>
      `;
    }

    modalContentWrap.innerHTML = `
      <div class="modal-breadcrumb-bar">
        <button type="button" class="breadcrumb-back-btn" id="breadcrumb-back-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
          <span>Back to ${parentData.title}</span>
        </button>
        <span class="breadcrumb-sep">/</span>
        <span class="breadcrumb-item active">${sub.title}</span>
      </div>

      <div class="modal-header-badge">
        <span class="partners-badge-dot"></span>
        <span>${sub.category} • DEEP FILE EXPLORER</span>
      </div>

      <h2 class="modal-title">${sub.title}</h2>
      <p class="modal-overview">${sub.summary}</p>

      ${specsHtml}
      ${lifecycleHtml}
      ${configPreviewHtml}
      ${complianceHtml}
      ${siblingFilesHtml}

      <div class="modal-actions-bar">
        <button class="btn btn-gold modal-sub-inquire-btn">
          <span>Inquire / Deploy This Specific Subsystem</span>
          <span class="btn-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </span>
        </button>
        <button class="btn btn-secondary modal-back-overview-btn">
          <span>← Back to All Modules</span>
        </button>
      </div>
    `;

    modalContentWrap.scrollTop = 0;

    // Back to Overview Button
    const backBtn = modalContentWrap.querySelector('#breadcrumb-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => openDetailModal(parentKey));
    }

    const backOverviewBtn = modalContentWrap.querySelector('.modal-back-overview-btn');
    if (backOverviewBtn) {
      backOverviewBtn.addEventListener('click', () => openDetailModal(parentKey));
    }

    // Sibling Files Quick Switch
    modalContentWrap.querySelectorAll('.sibling-file-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        const pKey = this.getAttribute('data-parent-key');
        const sIdx = parseInt(this.getAttribute('data-sub-idx'), 10);
        openSubDetailModal(pKey, sIdx);
      });
    });

    // Inquire Subsystem Button
    const subInquireBtn = modalContentWrap.querySelector('.modal-sub-inquire-btn');
    if (subInquireBtn) {
      subInquireBtn.addEventListener('click', function () {
        scrollToContactWithPreFill(parentData.serviceKey, `Hello Technosoft Masters, I am interested in deploying the specific subsystem: "${sub.title}" (${parentData.title}). Please provide deployment details and timeline.`);
      });
    }
  }

  function closeDetailModal() {
    if (!detailModal) return;
    detailModal.classList.remove('is-active');
    detailModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Attach click listeners to all elements with [data-modal-target]
  document.querySelectorAll('[data-modal-target]').forEach((card) => {
    card.addEventListener('click', function (e) {
      if (e.target.tagName.toLowerCase() === 'a') return;
      const targetKey = this.getAttribute('data-modal-target');
      if (targetKey) {
        openDetailModal(targetKey);
      }
    });

    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const targetKey = this.getAttribute('data-modal-target');
        if (targetKey) {
          openDetailModal(targetKey);
        }
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeDetailModal);
  }

  if (detailModal) {
    detailModal.addEventListener('click', function (e) {
      if (e.target === detailModal) {
        closeDetailModal();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && detailModal && detailModal.classList.contains('is-active')) {
      closeDetailModal();
    }
  });

  // --- Back To Top Action ---
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }
});
