'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Upload, FileText, CheckCircle, Star } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const categories = [
  'Ceramic and Glass',
  'Wood Works',
  'Jewellery',
  'Textile and Fiber',
  'Visual Art',
  'Metal Works',
  'Paper Works',
  'Leather Works',
  'Natural Material',
  'Upcycling',
  'Toys and Dolls'
];

const subscriptionPlans = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 'TSh 15,000',
    period: '/month',
    features: [
      'List up to 20 products',
      'Basic analytics',
      'Standard support',
      '5% commission on sales'
    ],
    popular: false
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 'TSh 25,000',
    period: '/month',
    features: [
      'List up to 50 products',
      'Advanced analytics',
      'Priority support',
      '3% commission on sales',
      'Featured product placement'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plan',
    price: 'TSh 70,000',
    period: '/month',
    features: [
      'Unlimited products',
      'Comprehensive analytics',
      '24/7 dedicated support',
      '2% commission on sales',
      'Premium placement',
      'Custom branding options'
    ],
    popular: false
  }
];

export default function ArtisanRegister() {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationalId: '',
    idNumber: '',
    dateOfBirth: '',
    gender: '',
    
    // Address Information
    region: '',
    district: '',
    ward: '',
    street: '',
    
    // Business Information
    businessName: '',
    businessDescription: '',
    businessType: '',
    yearsOfExperience: '',
    categories: [] as string[],
    
    // Documents
    businessLicense: null as File | null,
    nationalIdCopy: null as File | null,
    portfolioImages: [] as File[],
    
    // Subscription
    selectedPlan: '',
    
    // Terms
    agreeToTerms: false,
    agreeToMarketing: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleFileUpload = (field: string, files: FileList | null) => {
    if (!files) return;
    
    if (field === 'portfolioImages') {
      setFormData(prev => ({
        ...prev,
        [field]: Array.from(files)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: files[0]
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Registration submitted successfully! We will review your application and contact you soon.');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
              <p className="text-gray-600">Tell us about yourself</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+255 XXX XXX XXX"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label htmlFor="nationalId">National ID Type *</Label>
                <Select onValueChange={(value) => handleInputChange('nationalId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nida">NIDA (National ID)</SelectItem>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="driving-license">Driving License</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="idNumber">ID Number *</Label>
                <Input
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={(e) => handleInputChange('idNumber', e.target.value)}
                  placeholder="Enter your ID number"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Gender *</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange('gender', value)}
                  className="flex space-x-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Address Information</h2>
              <p className="text-gray-600">Where are you located?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="region">Region *</Label>
                <Select onValueChange={(value) => handleInputChange('region', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dar-es-salaam">Dar es Salaam</SelectItem>
                    <SelectItem value="arusha">Arusha</SelectItem>
                    <SelectItem value="kilimanjaro">Kilimanjaro</SelectItem>
                    <SelectItem value="mwanza">Mwanza</SelectItem>
                    <SelectItem value="dodoma">Dodoma</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="district">District *</Label>
                <Input
                  id="district"
                  value={formData.district}
                  onChange={(e) => handleInputChange('district', e.target.value)}
                  placeholder="Enter your district"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ward">Ward *</Label>
                <Input
                  id="ward"
                  value={formData.ward}
                  onChange={(e) => handleInputChange('ward', e.target.value)}
                  placeholder="Enter your ward"
                  required
                />
              </div>
              <div>
                <Label htmlFor="street">Street/Area</Label>
                <Input
                  id="street"
                  value={formData.street}
                  onChange={(e) => handleInputChange('street', e.target.value)}
                  placeholder="Enter street or area name"
                />
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Business Information</h2>
              <p className="text-gray-600">Tell us about your craft business</p>
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                placeholder="Enter your business name"
                required
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="businessDescription">Business Description *</Label>
              <Textarea
                id="businessDescription"
                value={formData.businessDescription}
                onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                placeholder="Describe your business, what you create, and your unique style..."
                rows={4}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessType">Business Type *</Label>
                <Select onValueChange={(value) => handleInputChange('businessType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual Artisan</SelectItem>
                    <SelectItem value="cooperative">Cooperative</SelectItem>
                    <SelectItem value="small-business">Small Business</SelectItem>
                    <SelectItem value="family-business">Family Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="yearsOfExperience">Years of Experience *</Label>
                <Select onValueChange={(value) => handleInputChange('yearsOfExperience', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">Less than 1 year</SelectItem>
                    <SelectItem value="1-3">1-3 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5-10">5-10 years</SelectItem>
                    <SelectItem value="10+">More than 10 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label>Craft Categories * (Select all that apply)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={formData.categories.includes(category)}
                      onCheckedChange={() => handleCategoryToggle(category)}
                    />
                    <Label htmlFor={category} className="text-sm">{category}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Document Upload</h2>
              <p className="text-gray-600">Upload required documents for verification</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="businessLicense">Business License * (PDF, JPG, PNG)</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <Input
                      id="businessLicense"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload('businessLicense', e.target.files)}
                      className="hidden"
                    />
                    <Label htmlFor="businessLicense" className="cursor-pointer text-green-600 hover:text-green-500">
                      Click to upload business license
                    </Label>
                  </div>
                  {formData.businessLicense && (
                    <p className="mt-2 text-sm text-green-600 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {formData.businessLicense.name}
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <Label htmlFor="nationalIdCopy">National ID Copy * (PDF, JPG, PNG)</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <Input
                      id="nationalIdCopy"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload('nationalIdCopy', e.target.files)}
                      className="hidden"
                    />
                    <Label htmlFor="nationalIdCopy" className="cursor-pointer text-green-600 hover:text-green-500">
                      Click to upload ID copy
                    </Label>
                  </div>
                  {formData.nationalIdCopy && (
                    <p className="mt-2 text-sm text-green-600 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {formData.nationalIdCopy.name}
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <Label htmlFor="portfolioImages">Portfolio Images (Optional - up to 5 images)</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <Input
                      id="portfolioImages"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      multiple
                      onChange={(e) => handleFileUpload('portfolioImages', e.target.files)}
                      className="hidden"
                    />
                    <Label htmlFor="portfolioImages" className="cursor-pointer text-green-600 hover:text-green-500">
                      Click to upload portfolio images
                    </Label>
                  </div>
                  {formData.portfolioImages.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-green-600 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        {formData.portfolioImages.length} image(s) uploaded
                      </p>
                      <div className="mt-2 text-xs text-gray-500">
                        {formData.portfolioImages.map((file, index) => (
                          <div key={index}>{file.name}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Choose Your Plan</h2>
              <p className="text-gray-600">Select a subscription plan that fits your business needs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subscriptionPlans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`relative cursor-pointer transition-all hover:shadow-lg ${
                    formData.selectedPlan === plan.id 
                      ? 'ring-2 ring-green-500 border-green-500' 
                      : 'border-gray-200'
                  } ${plan.popular ? 'border-green-400' : ''}`}
                  onClick={() => handleInputChange('selectedPlan', plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold text-green-600">
                      {plan.price}
                      <span className="text-sm font-normal text-gray-500">{plan.period}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-6">
                      <RadioGroup
                        value={formData.selectedPlan}
                        onValueChange={(value) => handleInputChange('selectedPlan', value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value={plan.id} id={plan.id} />
                          <Label htmlFor={plan.id}>Select this plan</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="space-y-4 pt-6 border-t">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
                  required
                />
                <Label htmlFor="agreeToTerms" className="text-sm">
                  I agree to the <a href="/terms" className="text-green-600 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-green-600 hover:underline">Privacy Policy</a> *
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeToMarketing"
                  checked={formData.agreeToMarketing}
                  onCheckedChange={(checked) => handleInputChange('agreeToMarketing', checked)}
                />
                <Label htmlFor="agreeToMarketing" className="text-sm">
                  I agree to receive marketing communications and updates about CraftArtMarketplace
                </Label>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-gray-500">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900">Artisan Registration</CardTitle>
            <CardDescription className="text-lg">
              Join CraftArtMarketplace and start showcasing your beautiful crafts to the world
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            {renderStepContent()}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6"
              >
                Previous
              </Button>
              
              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  className="bg-green-600 hover:bg-green-700 px-6"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.agreeToTerms || !formData.selectedPlan}
                  className="bg-green-600 hover:bg-green-700 px-6"
                >
                  Submit Registration
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}