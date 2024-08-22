'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Moon, Sun, Activity, Zap, Shield, ChevronRight } from 'lucide-react'
import { Button } from '@/Components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/Components/ui/card'
import { Switch } from '@/Components/ui/switch'
import { Link } from 'react-router-dom'

export default function Component() {
  const { theme, setTheme } = useTheme()
  const { scrollYProgress } = useScroll()
  const yRange = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-violet-50 to-violet-100 dark:from-violet-900 dark:to-violet-950 text-violet-900 dark:text-violet-50 transition-colors duration-300">
      <header className="px-4 lg:px-6 h-14 flex items-center backdrop-blur-md bg-white/30 dark:bg-violet-950/30 sticky top-0 z-50">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Activity className="h-6 w-6 text-violet-600 dark:text-violet-400" />
          <span className="ml-2 text-lg font-bold">APIMonitor</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#features" className="text-sm font-medium hover:text-violet-600 dark:hover:text-violet-300 transition-colors" prefetch={false}>
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-violet-600 dark:hover:text-violet-300 transition-colors" prefetch={false}>
            Pricing
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-violet-600 dark:hover:text-violet-300 transition-colors" prefetch={false}>
            Documentation
          </Link>
        </nav>
        <div className="ml-4 flex items-center">
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={toggleTheme}
            className="bg-violet-200 dark:bg-violet-700"
            aria-label="Toggle theme"
          />
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-violet-600 ml-2" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-violet-300 ml-2" />
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center space-y-4 text-center"
              initial="initial"
              animate="animate"
              variants={stagger}
            >
              <motion.h1
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400"
                variants={fadeIn}
              >
                Monitor Your APIs with Precision
              </motion.h1>
              <motion.p
                className="max-w-[700px] text-violet-700 dark:text-violet-200 md:text-xl"
                variants={fadeIn}
              >
                Real-time monitoring, instant alerts, and powerful analytics for your APIs. Stay ahead of issues 24/7.
              </motion.p>
              <motion.div variants={fadeIn}>
                <Button size="lg" className="mt-4 bg-violet-600 hover:bg-violet-700 text-white">
                  Get Started <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
            style={{ y: useTransform(yRange, [0, 1], [0, 200]) }}
          >
            <div className="w-64 h-64 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full blur-3xl opacity-20 dark:opacity-40" />
          </motion.div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-violet-900">
          <div className="container px-4 md:px-6">
            <motion.h2
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400"
              variants={fadeIn}
              initial="initial"
              animate="animate"
            >
              Powerful Features
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={stagger}
              initial="initial"
              animate="animate"
            >
              {[
                { icon: Activity, title: "Real-time Monitoring", description: "Track API performance with millisecond precision" },
                { icon: Zap, title: "Instant Alerts", description: "Get notified immediately when issues arise" },
                { icon: Shield, title: "Advanced Security", description: "Ensure your APIs are secure and compliant" }
              ].map((feature, index) => (
                <motion.div key={index} variants={fadeIn} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Card className="bg-violet-50 dark:bg-violet-800 border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-full bg-violet-200 dark:bg-violet-700 flex items-center justify-center mb-4">
                        <feature.icon className="h-6 w-6 text-violet-600 dark:text-violet-300" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-violet-800 dark:text-violet-200">{feature.title}</CardTitle>
                      <CardDescription className="text-violet-600 dark:text-violet-300">{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-violet-50 dark:bg-violet-950">
          <div className="container px-4 md:px-6">
            <motion.h2
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400"
              variants={fadeIn}
              initial="initial"
              animate="animate"
            >
              Choose Your Plan
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={stagger}
              initial="initial"
              animate="animate"
            >
              {[
                { title: "Starter", price: "$29", description: "Perfect for small projects" },
                { title: "Pro", price: "$99", description: "Ideal for growing businesses", featured: true },
                { title: "Enterprise", price: "Custom", description: "For large-scale operations" }
              ].map((plan, index) => (
                <motion.div key={index} variants={fadeIn} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Card className={`${plan.featured ? 'bg-gradient-to-br from-violet-500 to-purple-600 text-white' : 'bg-white dark:bg-violet-900'} border-none shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                    <CardHeader>
                      <CardTitle className={`text-2xl font-bold ${plan.featured ? 'text-white' : 'text-violet-800 dark:text-violet-200'}`}>{plan.title}</CardTitle>
                      <CardDescription className={plan.featured ? 'text-violet-100' : 'text-violet-600 dark:text-violet-300'}>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className={`text-4xl font-bold mb-2 ${plan.featured ? 'text-white' : 'text-violet-800 dark:text-violet-200'}`}>{plan.price}</div>
                      <p className={plan.featured ? 'text-violet-100' : 'text-violet-600 dark:text-violet-300'}>per month</p>
                      <Button className={`mt-4 w-full ${plan.featured ? 'bg-white text-violet-600 hover:bg-violet-100' : 'bg-violet-600 text-white hover:bg-violet-700'}`}>
                        Choose Plan
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-200">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© 2024 APIMonitor. All rights reserved.</p>
          <nav className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-sm hover:text-violet-600 dark:hover:text-violet-300 transition-colors" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="#" className="text-sm hover:text-violet-600 dark:hover:text-violet-300 transition-colors" prefetch={false}>
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}